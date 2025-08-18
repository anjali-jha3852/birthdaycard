import React, { useState, useEffect } from "react";
import MessageModal from "../Components/MessageModel.jsx";
import Confetti from "react-confetti";

// Images + Wishes
const galleryImages = [
  {
  src: "/images/image1.jpg",
   message: "Wishing you all the happiness in the world!",
    desc: "This is your special day 💖",
  },
  {
    src: "/images/image2.png",
    message: "May your day be filled with love and joy!",
    desc: "Hope this year brings endless smiles 🌸",
  },
  {
    src: "/images/image3.jpg",
    message: "Happy Birthday! You deserve the best!",
    desc: "Keep shining bright like the star you are ✨",
  },
  

];

// Stars
const Star = ({ size, top, left, delay }) => (
  <div
    className="absolute rounded-full bg-white opacity-80"
    style={{
      width: size,
      height: size,
      top: `${top}%`,
      left: `${left}%`,
      animation: `twinkle 2s ease-in-out ${delay}s infinite alternate`,
    }}
  />
);

// Floating hearts
const Heart = ({ size, left, delay, duration }) => (
  <div
    className="absolute text-pink-500"
    style={{
      fontSize: size,
      left: `${left}%`,
      bottom: "-10%",
      animation: `floatHeart ${duration}s ease-in ${delay}s infinite`,
    }}
  >
    ❤️
  </div>
);

// Balloons
const Balloon = ({ color, left, duration, delay }) => (
  <div
    className="absolute rounded-full opacity-80"
    style={{
      width: "40px",
      height: "60px",
      backgroundColor: color,
      left: `${left}%`,
      bottom: "-20%",
      animation: `rise ${duration}s ease-in ${delay}s forwards`,
      borderRadius: "50% 50% 50% 50%",
    }}
  />
);

const Gallery = () => {
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Stars
  const stars = Array.from({ length: 80 }, () => ({
    size: `${Math.random() * 2 + 1}px`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  // Hearts
  const hearts = Array.from({ length: 25 }, () => ({
    size: `${Math.random() * 20 + 20}px`,
    left: Math.random() * 90,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 3,
  }));

  // Balloons
  const colors = ["red", "blue", "yellow", "green", "purple", "orange", "pink"];
  const balloons = Array.from({ length: 40 }, () => ({
    color: colors[Math.floor(Math.random() * colors.length)],
    left: Math.random() * 100,
    duration: 4 + Math.random() * 3,
    delay: Math.random() * 3,
  }));

  // Show confetti when balloons rise
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden p-6">
      {/* Stars */}
      {stars.map((star, idx) => (
        <Star key={idx} {...star} />
      ))}

      {/* Hearts */}
      {hearts.map((heart, idx) => (
        <Heart key={idx} {...heart} />
      ))}

      {/* Balloons */}
      {balloons.map((balloon, idx) => (
        <Balloon key={idx} {...balloon} />
      ))}

      {/* Confetti */}
      {showConfetti && (
        <Confetti numberOfPieces={400} recycle={false} gravity={0.3} />
      )}

      {/* Big Birthday Wish */}
      <div className="relative z-10 text-center mt-20">
        <h1 className="text-5xl font-bold mb-4 text-pink-400 drop-shadow-lg">
          🎉 Happy Birthday Motki🎉
        </h1>
        <p className="text-xl display-flex align-item-centre justify-centre   text-gray-200">
          badhai ho badhai janamadin ki badhai teri mummy ki jay kya chij banai
          tu jab janam li thi toh wo raat sabse haseen thi aur jab jab jab ye tareek
           aata hai wo raat hamesha haseen ho jata hai shyad iss din ka sabse jada intezar mujhe tha 
           and mujhe laga hai ye din sirf mere liye banya gya tha kyuki tu jo dwonload (paida)hui hai 
           likh ke mai jada kuch bol nhi paunga isliye tujhe pta hai maine bola hai ki vc karna hai 
           raat ko something special for you
   💕
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-10 max-w-6xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {galleryImages.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
            onClick={() => setSelected(idx)}
          >
            <img
              src={item.src}
              alt={`gallery ${idx}`}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-base text-gray-300">{item.desc}</p>

              <audio src="/images/birthday-music.mp3" autoPlay loop muted />

            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected !== null && (
        <MessageModal
          message={galleryImages[selected].message}
          images={[galleryImages[selected].src]}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Animations */}
      <style>{`
        @keyframes twinkle {0%{opacity:0.2;transform:scale(0.8);}50%{opacity:1;transform:scale(1.2);}100%{opacity:0.2;transform:scale(0.8);} }
        @keyframes floatHeart {0%{bottom:-10%;opacity:0;}50%{bottom:50%;opacity:1;}100%{bottom:110%;opacity:0;} }
        @keyframes rise {0%{bottom:-20%;opacity:1;} 80%{opacity:1;} 100%{bottom:120%;opacity:0;} }
      `}</style>
    </div>
  );
};

export default Gallery;

import React from "react";

const hearts = ["❤️", "💖", "💝", "💘"];

const MessageModal = ({ message, images, onClose }) => {
  // Generate balloons
  const colors = ["#FF4D4D", "#4D79FF", "#4DFF88", "#FFFF4D", "#FF99CC", "#FF9933"];
  const balloons = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute w-12 h-16 rounded-full"
      style={{
        backgroundColor: colors[i % colors.length],
        left: `${Math.random() * 80}%`,
        bottom: "-100px",
        animation: `float ${5 + Math.random() * 5}s ease-in-out ${Math.random() * 5}s infinite`,
      }}
    ></div>
  ));

  return (
    <div className="fixed inset-0 border-b-green-300/50 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-11/12 max-w-lg text-center overflow-hidden">
        <button
          className="absolute top-2 right-4 text-xl font-bold"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="text-4xl mb-4 animate-bounce">{hearts[Math.floor(Math.random() * hearts.length)]}</div>
        <p className="text-xl mb-4">{message}</p>
        <div className="grid grid-cols-2 gap-2">
          {images.map((src, idx) => (
            <img key={idx} src={src} alt="gallery" className="rounded-lg shadow-md" />
          ))}
        </div>
        {balloons}

        {/* Floating animation */}
        <style>{`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-50vh) rotate(15deg); }
            100% { transform: translateY(-100vh) rotate(-15deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default MessageModal;

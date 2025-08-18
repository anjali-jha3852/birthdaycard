import React from "react";

// Array of colors for balloons
const colors = ["#FF4D4D", "#4D79FF", "#4DFF88", "#FFFF4D", "#FF99CC", "#FF9933"];

const randomPosition = () => Math.random() * 100; // percentage
const randomDelay = () => Math.random() * 5; // seconds
const randomDuration = () => 5 + Math.random() * 5; // 5-10s

const Balloon = ({ color }) => {
  const left = randomPosition();
  const delay = randomDelay();
  const duration = randomDuration();
  return (
    <div
      className="absolute w-12 h-16 rounded-full"
      style={{
        backgroundColor: color,
        left: `${left}%`,
        bottom: "-100px",
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    ></div>
  );
};

const BirthdayCard = () => {
  // Create 20 balloons
  const balloons = Array.from({ length: 20 }, (_, i) => (
    <Balloon key={i} color={colors[i % colors.length]} />
  ));

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-200 overflow-hidden">
      <div className="relative z-10 text-center bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-6xl mb-4 animate-bounce">🎉 Happy Birthday! 🎉</h1>
        <p className="text-lg md:text-xl">Wishing you a day full of joy and surprises!</p>
      </div>

      {/* Floating balloons */}
      {balloons}

      {/* CSS animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-50vh) rotate(15deg); }
          100% { transform: translateY(-100vh) rotate(-15deg); }
        }
      `}</style>
    </div>
  );
};

export default BirthdayCard;

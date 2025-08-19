import React, { useState } from "react";

const Wishes = () => {
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);

  const playSound = () => {
    const audio = new Audio("/birthdaycard/images/popup.mp3"); // ✅ put popup.mp3 in public/images
    audio.play();
  };

  const submitWish = () => {
    if (message.trim() !== "") {
      setWishes([...wishes, message]);
      setMessage("");
      playSound(); // 🔊 play sound when wish is added
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-orange-200 p-4 relative">
      
      {/* 🎂 Birthday Cake */}
      <img
        src="/birthdaycard/images/cake.png"   // ✅ place cake.png inside public/images/
        alt="Birthday Cake"
        className="w-40 h-40 mb-4 animate-bounce"
      />

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl mb-6 text-purple-700 font-bold text-center">
        💌 Send Your Wishes 💌
      </h1>

      {/* Input + Button */}
      <div className="flex flex-col items-center w-full max-w-sm">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your wish..."
          className="border p-2 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={submitWish}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
        >
          Send
        </button>
      </div>

      {/* Wishes List in Scrollable Box */}
      <ul className="mt-6 space-y-2 w-full max-w-sm max-h-60 overflow-y-auto">
        {wishes.map((wish, idx) => (
          <li
            key={idx}
            className="bg-white p-2 rounded-md shadow text-center text-gray-800 animate-fadeIn"
          >
            {wish}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishes;

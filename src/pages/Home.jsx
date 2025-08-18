// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";

const colors = [
  "red", "blue", "white", "orange", "black", "pink", "brown",
  "yellow", "purple", "cyan", "lime"
];

const HEART_EMOJIS = ["❤️","💙","🧡","🤍","🖤","💗","🤎","💛","💚","💜"];

const Home = () => {
  const targetDate = new Date("2025-08-21T00:00:10").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  // ====== Original 15 floating balloons ======
  const [balloons, setBalloons] = useState(
    [...Array(15)].map(() => ({
      id: Math.random(),
      left: Math.random() * 90 + "%",
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 80 + Math.random() * 40,
      exploded: false,
      burst: [],
      floatDur: 5 + Math.random() * 3,
    }))
  );

  // ====== 40 vanish balloons (0.40–0.90s, no confetti) ======
  const [vanishBalloons, setVanishBalloons] = useState([]);

  // ====== 40 vanish+confetti balloons (0.10–0.40s with burst) ======
  const [quickBalloons, setQuickBalloons] = useState([]);

   
  const [staticConfetti, setStaticConfetti] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/images/birthday-music.mp3"); // put mp3 in public/images
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  
  // Setup vanish + quick balloons + static confetti
  useEffect(() => {
    // 40 balloons that vanish in 0.40–0.90s
    const vb = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      visible: true,
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      timeout: Math.random() * (900 - 400) + 400
    }));
    setVanishBalloons(vb);
    vb.forEach((b) => {
      setTimeout(() => {
        setVanishBalloons((prev) =>
          prev.map((vb) => vb.id === b.id ? { ...vb, visible: false } : vb)
        );
      }, b.timeout);
    });

    // 40 balloons vanish with confetti in 0.10–0.40s
    const qb = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      visible: true,
      burst: [],
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      timeout: Math.random() * (400 - 100) + 100
    }));
    setQuickBalloons(qb);
    qb.forEach((b) => {
      setTimeout(() => {
        // create burst when disappearing
        const PARTICLES = 20;
        const burst = Array.from({ length: PARTICLES }).map(() => {
          const angle = Math.random() * Math.PI * 2;
          const power = 40 + Math.random() * 60;
          const dx = Math.cos(angle) * power;
          const dy = Math.sin(angle) * power;
          const width = 3 + Math.random() * 4;
          const height = width * (1.2 + Math.random() * 0.5);
          const rotStart = Math.floor(Math.random() * 360);
          return {
            id: Math.random(),
            dx, dy, width, height, rotStart,
            rotEnd: rotStart + 360 + Math.floor(Math.random() * 360),
            duration: 0.6 + Math.random() * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            radius: Math.random() < 0.2 ? "50%" : "6%",
          };
        });
        setQuickBalloons((prev) =>
          prev.map((q) => q.id === b.id ? { ...q, visible: false, burst } : q)
        );
      }, b.timeout);
    });

    // 70 scattered confetti
    const confetti = Array.from({ length: 140 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
    }));
    setStaticConfetti(confetti);
  }, []);

  // ====== Auto-explode 15 floating balloons ======
  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons(prev => {
        const next = [...prev];
        const idx = next.findIndex(b => !b.exploded);
        if (idx === -1) {
          clearInterval(interval);
          return next;
        }
        const PARTICLES = 30;
        const burst = Array.from({ length: PARTICLES }).map(() => {
          const angle = Math.random() * Math.PI * 2;
          const power = 80 + Math.random() * 120;
          const dx = Math.cos(angle) * power;
          const dy = Math.sin(angle) * power * 0.7;
          const width = 4 + Math.random() * 6;
          const height = width * (1.4 + Math.random() * 0.8);
          const rotStart = Math.floor(Math.random() * 360);
          const duration = 1 + Math.random() * 1.2;
          const shape = Math.random() < 0.2 ? "50%" : "6%";
          return {
            id: Math.random(),
            dx, dy, width, height, rotStart,
            rotEnd: rotStart + 720 + Math.floor(Math.random() * 360),
            duration,
            color: colors[Math.floor(Math.random() * colors.length)],
            radius: shape,
          };
        });
        next[idx] = { ...next[idx], exploded: true, burst };
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ====== Countdown ======
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-900 to-black text-white">

      {/* 40 vanish balloons (0.40–0.90s) */}
      {vanishBalloons.map(vb =>
        vb.visible && (
          <div key={vb.id}
            className="absolute rounded-full opacity-80"
            style={{
              width: "60px",
              height: "80px",
              backgroundColor: vb.color,
              top: vb.top,
              left: vb.left,
              transition: "opacity 0.3s ease-out",
              zIndex: 5
            }}
          />
        )
      )}

      {/* 40 vanish+confetti balloons (0.10–0.40s) */}
      {quickBalloons.map(qb => (
        <div key={qb.id}>
          {qb.visible && (
            <div
              className="absolute rounded-full"
              style={{
                width: "50px",
                height: "70px",
                backgroundColor: qb.color,
                top: qb.top,
                left: qb.left,
                zIndex: 6
              }}
            />
          )}
          {!qb.visible && qb.burst.map(p => (
            <span key={p.id} className="absolute"
              style={{
                left: qb.left,
                top: qb.top,
                width: `${p.width}px`,
                height: `${p.height}px`,
                backgroundColor: p.color,
                borderRadius: p.radius,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--rotStart": `${p.rotStart}deg`,
                "--rotEnd": `${p.rotEnd}deg`,
                animation: `paper-blast ${p.duration}s ease-out forwards`,
                zIndex: 10,
              }}
            />
          ))}
        </div>
      ))}

      {/* Static confetti */}
      {staticConfetti.map(piece => (
        <div key={piece.id} className="absolute w-2 h-4"
          style={{
            top: `${piece.y}%`,
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            zIndex: 2
          }}
        />
      ))}

      {/* Floating balloons */}
      {balloons.map(b => (
        <div key={b.id} className="absolute"
          style={{
            bottom: "-100px",
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size * 1.2}px`,
            animation: `${b.floatDur}s float-up linear forwards`,
            animationPlayState: b.exploded ? "paused" : "running",
            zIndex: 30,
          }}>
          <div className="rounded-full"
            style={{
              width: "100%", height: "100%",
              backgroundColor: b.color,
              transform: b.exploded ? "scale(1.8)" : "scale(1)",
              opacity: b.exploded ? 0 : 1,
              transition: "transform 0.6s ease, opacity 0.6s ease"
            }}
          />
          {!b.exploded && (
            <div style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              bottom: "-50%", width: "4px", height: `${b.size / 2}px`,
              backgroundColor: "#555"
            }} />
          )}
          {b.exploded && b.burst.map(p => (
            <span key={p.id} className="absolute"
              style={{
                left: "50%", top: "50%",
                width: `${p.width}px`, height: `${p.height}px`,
                backgroundColor: p.color, borderRadius: p.radius,
                transform: "translate(-50%, -50%)",
                "--dx": `${p.dx}px`, "--dy": `${p.dy}px`,
                "--rotStart": `${p.rotStart}deg`, "--rotEnd": `${p.rotEnd}deg`,
                animation: `paper-blast ${p.duration}s ease-out forwards`,
                zIndex: 40,
              }}
            />
          ))}
        </div>
      ))}

      {/* Countdown */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-50">
        <h2 className="text-3xl font-bold">Birthday Countdown 🎉</h2>
        <p className="text-lg">21 August 2025, 12:00:00</p>
        <div className="mt-4 text-4xl font-bold text-pink-300">
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
        </div>
           {/* 🎵 Play / Pause Music Button */}
      <button
        onClick={toggleMusic}
        className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        {isPlaying ? "⏸ Pause Music" : "▶ Play Music"}
      </button>
       
      </div>

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-120vh); }
        }
        @keyframes paper-blast {
          0% { transform: translate(0, 0) rotate(var(--rotStart)); opacity: 1; }
          60% { transform: translate(var(--dx), var(--dy)) rotate(calc(var(--rotStart) + 360deg)); opacity: 1; }
          100% { transform: translate(calc(var(--dx) * 0.8), calc(var(--dy) + 200px)) rotate(var(--rotEnd)); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;

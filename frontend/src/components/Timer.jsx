import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const playSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
      playSound();
      // Optional: Replace alert with a smoother toast notification later if you want
      alert("⏳ Time's up!");
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const start = () => {
    if (timeLeft === 0) {
      const total = Number(minutes) * 60 + Number(seconds);
      if (total <= 0) return;
      setTimeLeft(total);
    }
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setMinutes("");
    setSeconds("");
  };

  return (
    <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-sm flex flex-col justify-between h-full">
      
      {/* Title */}
      <div className="flex items-center gap-2 mb-2 text-left">
        <span className="text-sm">⏳</span>
        <h3 className="text-sm font-bold tracking-tight text-zinc-300">Focus Timer</h3>
      </div>

      {/* Dynamic Main Display: Inputs OR Running Timer */}
      <div className="my-4 flex items-center justify-center min-h-[60px]">
        {timeLeft === 0 && !isRunning ? (
          <div className="flex gap-3 w-full">
            {/* Minutes Input */}
            <div className="relative w-full">
              <input 
                type="number" 
                placeholder="00" 
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)} 
                className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2.5 text-zinc-200 placeholder-zinc-700 outline-none text-center font-mono text-xl transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
              <span className="absolute right-3 top-3 text-xs text-zinc-500 font-medium">m</span>
            </div>
            
            <div className="text-zinc-600 font-bold self-center text-xl">:</div>

            {/* Seconds Input */}
            <div className="relative w-full">
              <input 
                type="number" 
                placeholder="00" 
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)} 
                className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2.5 text-zinc-200 placeholder-zinc-700 outline-none text-center font-mono text-xl transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
              <span className="absolute right-3 top-3 text-xs text-zinc-500 font-medium">s</span>
            </div>
          </div>
        ) : (
          <div className="text-5xl font-mono font-black tracking-tight text-indigo-400 drop-shadow-[0_0_12px_rgba(99,102,241,0.2)]">
            {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        )}
      </div>

      {/* Premium Buttons Grid */}
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <button 
          onClick={isRunning ? () => setIsRunning(false) : start} 
          className={`rounded-xl py-2.5 text-xs font-semibold tracking-wide transition-all active:scale-[0.97] ${
            isRunning 
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20" 
              : "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30"
          }`}
        >
          {isRunning ? "Pause" : "Start Focus"}
        </button>
        
        <button 
          onClick={reset} 
          className="bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200 rounded-xl py-2.5 text-xs font-semibold tracking-wide transition-all active:scale-[0.97]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
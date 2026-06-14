import React, { useState, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    const startT = Date.now() - time;
    timerRef.current = setInterval(() => setTime(Date.now() - startT), 10);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (isRunning) setLaps([time, ...laps]);
  };

  const format = (ms) => {
    const min = Math.floor(ms / 60000).toString().padStart(2, "0");
    const sec = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0");
    const centi = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");
    return `${min}:${sec}.${centi}`;
  };

  return (
    <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-sm flex flex-col justify-between h-full">
      
      {/* Title */}
      <div className="flex items-center gap-2 mb-2 text-left">
        <span className="text-sm">⏱️</span>
        <h3 className="text-sm font-bold tracking-tight text-zinc-300">Stopwatch</h3>
      </div>

      {/* Main Big Timer Display */}
      <div className="text-4xl font-mono font-black tracking-tight text-zinc-100 my-4 text-center select-none drop-shadow-[0_0_12px_rgba(255,255,255,0.03)]">
        {format(time)}
      </div>

      {/* Grid Buttons Style (Premium/Minimalist Tones) */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {isRunning ? (
          <button 
            onClick={stop} 
            className="bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 rounded-xl py-2 text-xs font-semibold tracking-wide transition-all active:scale-[0.97]"
          >
            Stop
          </button>
        ) : (
          <button 
            onClick={start} 
            className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-xl py-2 text-xs font-semibold tracking-wide transition-all active:scale-[0.97]"
          >
            Start
          </button>
        )}
        
        <button 
          onClick={lap} 
          disabled={!isRunning}
          className={`rounded-xl py-2 text-xs font-semibold tracking-wide transition-all active:scale-[0.97] ${
            isRunning 
              ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 cursor-pointer" 
              : "bg-zinc-900 text-zinc-600 border border-zinc-800/50 cursor-not-allowed opacity-50"
          }`}
        >
          Lap
        </button>

        <button 
          onClick={reset} 
          className="col-span-2 bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200 rounded-xl py-2 text-xs font-semibold tracking-wide transition-all active:scale-[0.97]"
        >
          Reset
        </button>
      </div>

      {/* Premium Lap List Box */}
      {laps.length > 0 && (
        <div className="mt-2 max-h-[100px] overflow-y-auto border border-zinc-800/40 bg-zinc-900/30 rounded-xl p-2.5 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
          {laps.map((l, i) => (
            <div 
              key={i} 
              className="flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/30 last:border-0 pb-1 last:pb-0"
            >
              <span className="text-zinc-500 font-medium">Lap {laps.length - i}</span>
              <span className="text-zinc-200 font-semibold">{format(l)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
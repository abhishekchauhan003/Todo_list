import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/alarms";

export default function Alarm() {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [input, setInput] = useState("");
  // BUG FIX: Track the last triggered time so it rings exactly once when the minute matches
  const [lastRungTime, setLastRungTime] = useState(""); 

  // Fetch initial alarms
  useEffect(() => {
    axios.get(API).then((res) => setAlarms(res.data));
  }, []);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      const currentStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      
      // Check if current minute matches any alarm AND hasn't rung yet
      const shouldRing = alarms.some((a) => a.time === currentStr);

      if (shouldRing && currentStr !== lastRungTime) {
        triggerRing();
        setLastRungTime(currentStr); // Mark this minute as "rung"
        alert(`⏰ Alarm! The time is ${currentStr}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [alarms, lastRungTime]);

  const triggerRing = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Double beep for a real alarm feel
      const playBeep = (startTime) => {
        const osc = ctx.createOscillator();
        osc.type = "square"; // Harsher sound for alarm
        osc.frequency.setValueAtTime(880, ctx.currentTime + startTime);
        osc.connect(ctx.destination);
        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + 0.2);
      };

      playBeep(0);
      playBeep(0.4);
      playBeep(0.8);
      
    } catch (err) {
      console.log("Audio play blocked by browser:", err);
    }
  };

  const addAlarm = async (e) => {
    e.preventDefault();
    if (!input) return;
    const res = await axios.post(API, { time: input });
    setAlarms([...alarms, res.data]);
    setInput("");
  };

  const deleteAlarm = async (id) => {
    await axios.delete(`${API}/${id}`);
    setAlarms(alarms.filter((a) => a._id !== id));
  };

  return (
    <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-sm flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">⏰</span>
          <h3 className="text-sm font-bold tracking-tight text-zinc-300">Alarms</h3>
        </div>
        <div className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={addAlarm} className="flex gap-2 mb-4">
        <input 
          type="time" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="flex-1 bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2 text-zinc-200 outline-none text-sm transition-all [color-scheme:dark] cursor-pointer" 
        />
        <button 
          type="submit" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-600/10 active:scale-[0.97]"
        >
          Set
        </button>
      </form>

      {/* Alarm List */}
      <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
        {alarms.length === 0 ? (
          <p className="text-zinc-600 text-xs text-center py-4 font-medium">No alarms set</p>
        ) : (
          alarms.map((a) => (
            <div 
              key={a._id} 
              className="flex justify-between items-center bg-zinc-900/30 border border-zinc-800/50 p-2.5 rounded-xl group hover:border-zinc-700 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="text-indigo-400 text-xs">🔔</span>
                <span className="font-mono text-zinc-200 text-sm">{a.time}</span>
              </div>
              <button 
                onClick={() => deleteAlarm(a._id)} 
                className="text-zinc-600 hover:text-rose-400 p-1 rounded-md transition-colors"
                title="Delete alarm"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
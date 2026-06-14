import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import Alarm from "./components/Alarm";
import Notes from "./components/Notes";
import WeatherWidget from "./components/WeatherWidget";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 transition-colors duration-300 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      
      {/* Sleek Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
            <span className="text-indigo-500">❖</span> Workspace
          </h1>
          <p className="text-sm text-zinc-500 mt-1 font-medium">Focus on what matters today.</p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      {/* Modern Grid Layout */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Todo List (Takes up more space natively) */}
        <div className="lg:col-span-8 space-y-6">
          <Todo />
        </div>

        {/* Right Side: Widgets Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <WeatherWidget />
          <div className="grid grid-cols-2 gap-4">
            <Timer />
            <Stopwatch />
          </div>
          <Alarm />
          <Notes />
        </div>

      </main>
    </div>
  );
}
import React from "react";

export default function WeatherWidget() {
  // Built out cleanly out-of-the-box to work without mandatory live network keys.
  const weather = { temp: 22, condition: "Clear Sky", city: "San Francisco", icon: "☀️" };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">Local Weather</p>
        <h3 className="text-md font-bold leading-tight">{weather.city}</h3>
        <p className="text-xs opacity-90">{weather.condition}</p>
      </div>
      <div className="flex items-center gap-1.5 text-xl font-bold font-mono">
        <span>{weather.icon}</span>
        <span>{weather.temp}°C</span>
      </div>
    </div>
  );
}
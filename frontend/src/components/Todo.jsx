import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/todos";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    axios.get(API).then((res) => setTasks(res.data));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await axios.post(API, {
      text: input,
      priority,
      dueDate: dueDate || "No Due Date"
    });
    setTasks([res.data, ...tasks]);
    setInput("");
    setDueDate("");
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API}/${id}`, { completed: !completed });
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
  };

  const saveEdit = async (id) => {
    const res = await axios.put(`${API}/${id}`, { text: editText });
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    setEditingId(null);
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    if (filter === "Completed") return matchesSearch && t.completed;
    if (filter === "Pending") return matchesSearch && !t.completed;
    return matchesSearch;
  });

  // Priority color badges system
  const getPriorityStyle = (prio) => {
    if (prio === "High") return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    if (prio === "Medium") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  };

  return (
    <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
      
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">📋</span>
        <h2 className="text-xl font-bold tracking-tight text-zinc-100">Tasks</h2>
      </div>

      {/* Modern Form Layout */}
      <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 py-2.5 text-zinc-200 placeholder-zinc-600 transition-all outline-none text-sm"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2.5 text-zinc-300 transition-all outline-none text-sm cursor-pointer"
        >
          <option value="High" className="bg-zinc-900">🔥 High</option>
          <option value="Medium" className="bg-zinc-900">⚡ Medium</option>
          <option value="Low" className="bg-zinc-900">🍃 Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2.5 text-zinc-300 transition-all outline-none text-sm cursor-pointer [color-scheme:dark]"
        />
        <button 
          type="submit" 
          className="md:col-span-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-4 py-3 transition-all duration-200 shadow-lg shadow-indigo-600/10 active:scale-[0.99] text-sm"
        >
          + Add Task
        </button>
      </form>

      {/* Controls: Search & Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-stretch sm:items-center border-t border-zinc-800/40 pt-5">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900/40 border border-zinc-800/60 focus:border-indigo-500/40 rounded-xl px-4 py-2 text-zinc-200 placeholder-zinc-600 transition-all outline-none text-xs sm:w-64"
        />
        
        {/* Sleek Filter Pill Bar */}
        <div className="flex gap-1 bg-zinc-900 border border-zinc-800/80 p-1 rounded-xl self-start sm:self-auto">
          {["All", "Pending", "Completed"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 ${
                filter === f 
                  ? "bg-zinc-800 text-zinc-100 border border-zinc-700/50 shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List Container */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
        {filteredTasks.length === 0 ? (
          <p className="text-zinc-600 text-xs text-center py-6 font-medium tracking-wide">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task._id} 
              className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl hover:border-zinc-700/60 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task._id, task.completed)}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0 transition-all cursor-pointer accent-indigo-600"
                />
                
                <div className="flex-1 min-w-0">
                  {editingId === task._id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(task._id)}
                      className="w-full bg-transparent border-b border-indigo-500 outline-none text-sm text-zinc-200 py-0.5"
                      autoFocus
                    />
                  ) : (
                    <p className={`text-sm font-medium truncate tracking-wide transition-all ${
                      task.completed ? "line-through text-zinc-600" : "text-zinc-200"
                    }`}>
                      {task.text}
                    </p>
                  )}
                  
                  {/* Subtle Subtitles and Badges */}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getPriorityStyle(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="text-[10px] text-zinc-500 font-medium">
                        • Due: {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons with Fade-in Effect */}
              <div className="flex gap-1 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 pl-2">
                <button 
                  onClick={() => startEdit(task)} 
                  className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all text-sm"
                  title="Edit"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => deleteTask(task._id)} 
                  className="p-1.5 hover:bg-rose-500/10 rounded-lg text-zinc-500 hover:text-rose-400 transition-all text-sm"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
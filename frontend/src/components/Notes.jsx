import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/note";

export default function Notes() {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(API).then((res) => setContent(res.data.content));
  }, []);

  const saveNote = async (text) => {
    setContent(text);
    await axios.put(API, { content: text });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border dark:border-gray-700">
      <h3 className="text-sm font-bold mb-2">📌 Quick Notes</h3>
      <textarea
        value={content}
        onChange={(e) => saveNote(e.target.value)}
        placeholder="Type here to save instantly to MongoDB database..."
        className="w-full h-24 p-2 text-xs bg-amber-50/20 dark:bg-gray-900 border dark:border-gray-700 rounded-lg outline-none resize-none"
      />
    </div>
  );
}
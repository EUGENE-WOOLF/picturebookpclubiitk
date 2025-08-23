"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function MainSegment() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState(null);
  const inputRef = useRef(null);

  const generateStory = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setStory(null);

    try {
      const res = await fetch("http://localhost:4000/stories/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setStory(data.story);
      console.log("Response JSON:", data);
    } catch (err) {
      console.error("Error generating story:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] w-full p-6 flex flex-col space-y-6 items-center justify-center ">
      {/* Logo / header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center justify-center"
      >
        <div className="text-2xl font-bold text-black tracking-wide drop-shadow">
          {/* Logo here */}
          📖 PictureBook AI
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text drop-shadow-lg">
          Generate Your Picture Book
        </h1>
        <p className="text-gray-700 mt-2">
          Generate and explore ideas like never before.
        </p>
      </motion.div>

      {/* Input box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex items-center space-x-3 w-full max-w-2xl"
      >
        <input
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type your story idea..."
          className="flex-1 p-3 rounded-xl bg-white/50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-md"
        />
        <button
          onClick={generateStory}
          disabled={loading}
          className={`px-5 py-3 rounded-xl text-white font-medium shadow-lg hover:scale-105 transition-transform ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-600"
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </motion.div>

      {/* Story display */}
      {story?.segments?.map((seg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
          className="relative max-w-3xl w-full mx-auto my-8 bg-gradient-to-br from-pink-50 via-white to-indigo-50 border-4 border-indigo-200 
               rounded-3xl shadow-xl p-8 prose prose-lg text-gray-800
               hover:shadow-2xl transition-shadow"
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-indigo-300 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-indigo-300 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-indigo-300 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-indigo-300 rounded-br-3xl"></div>

          {/* Title like a chapter heading */}
          <h3 className="text-2xl font-bold mb-4 text-center text-indigo-700 drop-shadow-sm">
            {seg.title}
          </h3>

          {/* Story text */}
          <p className="whitespace-pre-line leading-relaxed text-gray-700 text-lg italic text-center">
            {seg.content}
          </p>

          {/* Picture in a framed style */}
          {seg.imageUrl && (
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.25 + 0.3, duration: 0.6 }}
            >
              <div className="p-2 border-4 border-pink-200 bg-white rounded-2xl shadow-md">
                <img
                  src={`http://localhost:4000${seg.imageUrl}`}
                  alt={seg.title}
                  className="max-h-[400px] rounded-xl object-cover"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

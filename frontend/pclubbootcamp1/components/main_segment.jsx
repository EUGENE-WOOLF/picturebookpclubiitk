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
      {story && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 w-full max-w-3xl space-y-6"
        >
          <h2 className="text-2xl font-semibold">{story.title}</h2>
          {story.segments.map((seg, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium mb-2">{seg.title}</h3>
              <p className="text-gray-700 whitespace-pre-line">{seg.content}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

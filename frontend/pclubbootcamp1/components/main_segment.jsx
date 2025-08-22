"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function MainSegment() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  function getInput() {
    console.log(inputRef.current.value);
  }

  return (
    <div className="relative min-h-[80vh] w-full p-6 flex flex-col space-y-6 items-center justify-center">
      {/* Logo / header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center justify-center"
      >
        <div className="text-2xl font-bold text-black tracking-wide drop-shadow">
          {/* adding the logo here */}
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
        <p className="text-black mt-2">
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
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-xl bg-white/50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-md"
        />
        <button
          onClick={getInput}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg hover:scale-105 transition-transform"
        >
          Send
        </button>
      </motion.div>
    </div>
  );
}

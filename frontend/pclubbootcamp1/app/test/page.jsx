"use client";

import { useState } from "react";

export default function StoryGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState(null);

  const generateStory = async () => {
    if (!prompt.trim()) return; // ignore empty prompts

    setLoading(true);
    setStory(null); // clear previous story

    try {
      const res = await fetch("http://localhost:4000/stories/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setStory(data.story); // set story for display
      console.log("Response JSON:", data);
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Story Generator
      </h1>

      {/* Input + Button */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a theme or idea..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateStory}
          disabled={loading}
          className={`px-5 py-2 rounded-lg text-white font-semibold ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* Story Display */}
      {story && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">{story.title}</h2>
          {story.segments.map((seg, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium mb-2">{seg.title}</h3>
              <p className="text-gray-700 whitespace-pre-line">{seg.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

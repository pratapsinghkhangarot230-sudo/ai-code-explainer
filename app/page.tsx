"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const explain = async () => {
    setLoading(true);

    const res = await fetch("/api/explain", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setResult(data.explanation);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 space-y-5 shadow-lg">

        <h1 className="text-3xl font-semibold text-center tracking-tight">
          AI Code Explainer
        </h1>

        <textarea
          className="w-full p-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          placeholder="Paste your code here..."
          rows={6}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={explain}
          className="w-full bg-white text-black py-2.5 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          {loading ? "Analyzing..." : "Explain Code"}
        </button>

        {result && (
          <div className="bg-black border border-gray-800 p-4 rounded-lg transition-all">
           <div className="space-y-2 text-sm">
  {result.split("\n").map((line, i) => (
    <p key={i}>{line}</p>
  ))}
</div>
          </div>
        )}

      </div>
    </div>
  );
}
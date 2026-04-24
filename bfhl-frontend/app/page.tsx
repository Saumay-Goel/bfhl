"use client";
import { useState } from "react";
import InputPanel from "@/components/InputPanel";
import ResultPanel from "@/components/ResultPanel";
import { BfhlResponse } from "@/libs/types";

export default function Home() {
  const [result, setResult] = useState<BfhlResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[#0d0f14] text-slate-200 font-mono selection:bg-emerald-500/30">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
        {/* Hero Section */}
        <header className="mb-12 border-b border-slate-800 pb-10">
          <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] uppercase tracking-[0.2em] mb-4">
            SRM Full Stack Challenge
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-100 leading-none mb-6">
            BFHL <span className="text-emerald-400">Hierarchy</span> Engine
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-md">
            Parse complex node strings, detect recursive cycles, and visualize
            data structures in real-time.
          </p>
        </header>

        <div className="space-y-8">
          <InputPanel
            onResult={setResult}
            onError={setError}
            onLoading={setLoading}
            loading={loading}
          />

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
              <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-red-500/20">
                ⚠
              </span>
              {error}
            </div>
          )}

          {result && <ResultPanel data={result} />}
        </div>
      </div>
    </main>
  );
}

"use client";
import { useState } from "react";
import { BfhlResponse } from "@/libs/types";

interface Props {
  onResult: (data: BfhlResponse) => void;
  onError: (msg: string) => void;
  onLoading: (v: boolean) => void;
  loading: boolean;
}

export default function InputPanel({
  onResult,
  onError,
  onLoading,
  loading,
}: Props) {
  const [input, setInput] = useState('["A->B", "A->C", "B->D"]');

  async function handleSubmit() {
    onLoading(true);
    onError("");
    try {
      let parsed: string[];
      try {
        parsed = JSON.parse(input);
        if (!Array.isArray(parsed)) throw new Error();
      } catch {
        parsed = input
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bfhl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data: BfhlResponse = await res.json();
      onResult(data);
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Network request failed");
    } finally {
      onLoading(false);
    }
  }

  return (
    <section className="bg-[#141720] border border-slate-800 rounded-xl p-6 shadow-2xl">
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          Node List
        </label>
        <span className="text-xs text-slate-600">
          JSON array or comma-separated. Example:{" "}
          <code className="text-blue-400 bg-blue-500/5 px-1 rounded">
            A-&gt;B, C-&gt;D
          </code>
        </span>
      </div>

      <textarea
        className="w-full bg-[#0d0f14] text-slate-200 border border-slate-800 rounded-lg p-4 font-mono text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all min-h-[120px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
      />

      <button
        className="mt-4 w-full md:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-50 disabled:active:scale-100 text-[#0d0f14] font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-[#0d0f14]/30 border-t-[#0d0f14] rounded-full animate-spin" />
        ) : null}
        {loading ? "Processing..." : "Analyse Hierarchy"}
      </button>
    </section>
  );
}

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
        // try comma-split fallback
        parsed = input
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bfhl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data: BfhlResponse = await res.json();
      onResult(data);
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      onLoading(false);
    }
  }

  return (
    <div className="input-panel">
      <label className="input-label">Node List</label>
      <p className="input-hint">
        Enter as JSON array or comma-separated:{" "}
        <code>A-&gt;B, A-&gt;C, B-&gt;D</code>
      </p>
      <textarea
        className="input-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        spellCheck={false}
      />
      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? (
          <span className="btn-inner">
            <span className="spinner" /> Processing...
          </span>
        ) : (
          "Analyse Hierarchy"
        )}
      </button>
    </div>
  );
}

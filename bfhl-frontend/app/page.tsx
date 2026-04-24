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
    <main className="main">
      <div className="hero">
        <div className="hero-tag">SRM Full Stack Challenge</div>
        <h1 className="hero-title">
          BFHL
          <br />
          Hierarchy
          <br />
          Engine
        </h1>
        <p className="hero-sub">
          Parse node strings. Detect cycles. Visualise trees.
        </p>
      </div>

      <div className="content">
        <InputPanel
          onResult={setResult}
          onError={setError}
          onLoading={setLoading}
          loading={loading}
        />

        {error && (
          <div className="error-box">
            <span className="error-icon">⚠</span> {error}
          </div>
        )}

        {result && <ResultPanel data={result} />}
      </div>
    </main>
  );
}

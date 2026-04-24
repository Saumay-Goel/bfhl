"use client";
import { BfhlResponse } from "@/libs/types";
import TreeView from "./TreeView";

export default function ResultPanel({ data }: { data: BfhlResponse }) {
  return (
    <div className="result-panel">
      <div className="meta-grid">
        <div className="meta-card">
          <span className="meta-label">User ID</span>
          <span className="meta-value">{data.user_id}</span>
        </div>
        <div className="meta-card">
          <span className="meta-label">Email</span>
          <span className="meta-value">{data.email_id}</span>
        </div>
        <div className="meta-card">
          <span className="meta-label">Roll Number</span>
          <span className="meta-value">{data.college_roll_number}</span>
        </div>
      </div>

      <div className="summary-bar">
        <div className="summary-item">
          <span className="summary-num">{data.summary.total_trees}</span>
          <span className="summary-lbl">Trees</span>
        </div>
        <div className="summary-item">
          <span className="summary-num">{data.summary.total_cycles}</span>
          <span className="summary-lbl">Cycles</span>
        </div>
        <div className="summary-item">
          <span className="summary-num">
            {data.summary.largest_tree_root || "—"}
          </span>
          <span className="summary-lbl">Largest Root</span>
        </div>
      </div>

      <h3 className="section-title">Hierarchies</h3>
      <div className="hierarchies-grid">
        {data.hierarchies.map((h, i) => (
          <div
            key={i}
            className={`hierarchy-card ${h.has_cycle ? "cycle-card" : ""}`}
          >
            <div className="hierarchy-header">
              <span className="hierarchy-root">Root: {h.root}</span>
              {h.has_cycle ? (
                <span className="badge cycle-badge">Cycle</span>
              ) : (
                <span className="badge depth-badge">Depth: {h.depth}</span>
              )}
            </div>
            {h.has_cycle ? (
              <p className="cycle-msg">Cyclic group — no tree structure</p>
            ) : (
              <div className="tree-wrap">
                <TreeView node={h.root} tree={h.tree} />
              </div>
            )}
          </div>
        ))}
      </div>

      {data.invalid_entries.length > 0 && (
        <div className="pill-section">
          <h3 className="section-title">Invalid Entries</h3>
          <div className="pill-row">
            {data.invalid_entries.map((e, i) => (
              <span key={i} className="pill invalid-pill">
                {e}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.duplicate_edges.length > 0 && (
        <div className="pill-section">
          <h3 className="section-title">Duplicate Edges</h3>
          <div className="pill-row">
            {data.duplicate_edges.map((e, i) => (
              <span key={i} className="pill dup-pill">
                {e}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { BfhlResponse } from "@/libs/types";
import TreeView from "./TreeView";

export default function ResultPanel({ data }: { data: BfhlResponse }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "User ID", value: data.user_id },
          { label: "Email", value: data.email_id },
          { label: "Roll Number", value: data.college_roll_number },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-[#141720] border border-slate-800 p-4 rounded-xl"
          >
            <span className="block text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">
              {item.label}
            </span>
            <span className="text-blue-400 text-sm truncate block font-semibold">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap border border-slate-800 rounded-xl overflow-hidden mb-12 bg-[#141720]">
        {[
          {
            label: "Trees",
            val: data.summary.total_trees,
            color: "text-emerald-400",
          },
          {
            label: "Cycles",
            val: data.summary.total_cycles,
            color: "text-red-400",
          },
          {
            label: "Largest Root",
            val: data.summary.largest_tree_root || "—",
            color: "text-blue-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex-1 min-w-[120px] p-6 text-center border-r last:border-r-0 border-slate-800"
          >
            <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
              {stat.val}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-6">
        Hierarchies
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {data.hierarchies.map((h, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl border bg-[#141720] ${h.has_cycle ? "border-red-900/50" : "border-slate-800"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-slate-100">
                Root: {h.root}
              </span>
              {h.has_cycle ? (
                <span className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold rounded uppercase tracking-wider border border-red-500/20">
                  Cycle
                </span>
              ) : (
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-500/20">
                  Depth: {h.depth}
                </span>
              )}
            </div>
            {h.has_cycle ? (
              <p className="text-slate-500 italic text-xs">
                Cyclic dependency detected. Tree visualization disabled.
              </p>
            ) : (
              <div className="overflow-x-auto py-2">
                <TreeView node={h.root} tree={h.tree} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {data.invalid_entries.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">
              Invalid Entries
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.invalid_entries.map((e, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-xs"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.duplicate_edges.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">
              Duplicates (Ignored)
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.duplicate_edges.map((e, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-xs"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

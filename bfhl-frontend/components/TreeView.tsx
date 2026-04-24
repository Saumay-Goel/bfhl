"use client";

interface TreeData {
  [key: string]: TreeData;
}

interface TreeViewProps {
  node: string;
  tree: TreeData;
  depth?: number;
}

export default function TreeView({ node, tree, depth = 0 }: TreeViewProps) {
  const currentTree = tree[node] || tree;
  const entries = Object.entries(currentTree);

  return (
    <div
      className={`relative ${depth > 0 ? "ml-6 border-l border-slate-800 border-dashed pl-4 my-1" : ""}`}
    >
      <div className="flex items-center gap-3 group py-1">
        <span
          className={`w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125 ${
            depth === 0
              ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
              : "bg-blue-400"
          }`}
        />
        <span className="text-sm font-semibold tracking-wide text-slate-200">
          {node}
        </span>
      </div>

      {entries.length > 0 && (
        <div className="flex flex-col">
          {entries.map(([child, subtree]) => (
            <TreeView
              key={child}
              node={child}
              tree={subtree}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

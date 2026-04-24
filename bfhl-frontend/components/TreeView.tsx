"use client";

interface TreeViewProps {
  node: string;
  tree: object;
  depth?: number;
}

export default function TreeView({ node, tree, depth = 0 }: TreeViewProps) {
  const entries = Object.entries(tree);

  return (
    <div
      className="tree-node"
      style={{ paddingLeft: depth === 0 ? 0 : "1.5rem" }}
    >
      <div className="node-label">
        <span className="node-dot" />
        <span className="node-name">{node}</span>
      </div>
      {entries.length > 0 && (
        <div className="node-children">
          {entries.map(([child, subtree]) => (
            <TreeView
              key={child}
              node={child}
              tree={subtree as object}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

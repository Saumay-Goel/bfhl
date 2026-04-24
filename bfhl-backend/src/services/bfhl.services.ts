import { HierarchyObject } from "../types";

const USER_ID = process.env.USER_ID!;
const EMAIL_ID = process.env.EMAIL_ID!;
const COLLEGE_ROLL = process.env.COLLEGE_ROLL!;

const VALID_EDGE = /^[A-Z]->[A-Z]$/;

function validateAndClassify(data: string[]): {
  valid: string[];
  invalid: string[];
  duplicates: string[];
} {
  const invalid: string[] = [];
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  const valid: string[] = [];

  for (const raw of data) {
    const entry = raw.trim();

    if (!VALID_EDGE.test(entry)) {
      invalid.push(raw);
      continue;
    }

    const [parent, child] = [entry[0], entry[3]];
    if (parent === child) {
      invalid.push(raw);
      continue;
    }

    if (seen.has(entry)) {
      if (!duplicates.has(entry)) {
        duplicates.add(entry);
      }
    } else {
      seen.add(entry);
      valid.push(entry);
    }
  }

  return { valid, invalid, duplicates: Array.from(duplicates) };
}

function buildGroups(validEdges: string[]): Map<string, string[]> {
  const children = new Map<string, string[]>();
  const parentOf = new Map<string, string>();
  const allNodes = new Set<string>();

  for (const edge of validEdges) {
    const parent = edge[0];
    const child = edge[3];
    allNodes.add(parent);
    allNodes.add(child);

    if (!parentOf.has(child)) {
      parentOf.set(child, parent);
      if (!children.has(parent)) children.set(parent, []);
      children.get(parent)!.push(child);
    }
  }

  return children;
}

function findRoots(validEdges: string[]): {
  children: Map<string, string[]>;
  roots: Set<string>;
  allNodes: Set<string>;
} {
  const children = new Map<string, string[]>();
  const childNodes = new Set<string>();
  const allNodes = new Set<string>();

  for (const edge of validEdges) {
    const parent = edge[0];
    const child = edge[3];
    allNodes.add(parent);
    allNodes.add(child);

    if (!children.has(parent)) children.set(parent, []);

    if (!childNodes.has(child)) {
      children.get(parent)!.push(child);
      childNodes.add(child);
    }
  }

  const roots = new Set<string>();
  for (const node of allNodes) {
    if (!childNodes.has(node)) roots.add(node);
  }

  return { children, roots, allNodes };
}

function getConnectedComponents(
  allNodes: Set<string>,
  children: Map<string, string[]>,
): Set<string>[] {
  const parent = new Map<string, string>();
  for (const n of allNodes) parent.set(n, n);

  function find(x: string): string {
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)!));
    return parent.get(x)!;
  }

  function union(a: string, b: string) {
    parent.set(find(a), find(b));
  }

  for (const [p, cs] of children) {
    for (const c of cs) union(p, c);
  }

  const groups = new Map<string, Set<string>>();
  for (const n of allNodes) {
    const root = find(n);
    if (!groups.has(root)) groups.set(root, new Set());
    groups.get(root)!.add(n);
  }

  return Array.from(groups.values());
}

function hasCycle(
  nodes: Set<string>,
  children: Map<string, string[]>,
): boolean {
  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(node: string): boolean {
    visited.add(node);
    inStack.add(node);
    for (const child of children.get(node) ?? []) {
      if (!visited.has(child)) {
        if (dfs(child)) return true;
      } else if (inStack.has(child)) {
        return true;
      }
    }
    inStack.delete(node);
    return false;
  }

  for (const n of nodes) {
    if (!visited.has(n)) {
      if (dfs(n)) return true;
    }
  }
  return false;
}

function buildTree(node: string, children: Map<string, string[]>): object {
  const kids = children.get(node) ?? [];
  if (kids.length === 0) return {};
  const result: Record<string, object> = {};
  for (const child of kids) {
    result[child] = buildTree(child, children);
  }
  return result;
}

function getDepth(node: string, children: Map<string, string[]>): number {
  const kids = children.get(node) ?? [];
  if (kids.length === 0) return 1;
  return 1 + Math.max(...kids.map((c) => getDepth(c, children)));
}

export function processBfhl(
  data: string[],
): ReturnType<typeof buildFullResponse> {
  return buildFullResponse(data);
}

function buildFullResponse(data: string[]) {
  const { valid, invalid, duplicates } = validateAndClassify(data);
  const { children, roots, allNodes } = findRoots(valid);

  const components = getConnectedComponents(allNodes, children);

  const hierarchies: HierarchyObject[] = [];
  let totalTrees = 0;
  let totalCycles = 0;
  let largestRoot = "";
  let largestDepth = -1;

  for (const component of components) {
    const compRoots = [...component].filter((n) => roots.has(n));
    const cyclic = hasCycle(component, children);

    if (cyclic) {
      totalCycles++;
      const cycleRoot = [...component].sort()[0];
      hierarchies.push({ root: cycleRoot, tree: {}, has_cycle: true });
    } else {
      totalTrees++;
      const treeRoot =
        compRoots.length > 0 ? compRoots.sort()[0] : [...component].sort()[0];

      const tree = buildTree(treeRoot, children);
      const depth = getDepth(treeRoot, children);

      hierarchies.push({ root: treeRoot, tree, depth });

      if (
        depth > largestDepth ||
        (depth === largestDepth && treeRoot < largestRoot)
      ) {
        largestDepth = depth;
        largestRoot = treeRoot;
      }
    }
  }

  return {
    user_id: USER_ID,
    email_id: EMAIL_ID,
    college_roll_number: COLLEGE_ROLL,
    hierarchies,
    invalid_entries: invalid,
    duplicate_edges: duplicates,
    summary: {
      total_trees: totalTrees,
      total_cycles: totalCycles,
      largest_tree_root: largestRoot,
    },
  };
}

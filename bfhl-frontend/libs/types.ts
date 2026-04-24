export interface TreeData {
  [key: string]: TreeData;
}

export interface HierarchyObject {
  root: string;
  tree: TreeData;
  depth?: number;
  has_cycle?: boolean;
}

export interface BfhlResponse {
  user_id: string;
  email_id: string;
  college_roll_number: string;
  hierarchies: HierarchyObject[];
  invalid_entries: string[];
  duplicate_edges: string[];
  summary: {
    total_trees: number;
    total_cycles: number;
    largest_tree_root: string;
  };
}

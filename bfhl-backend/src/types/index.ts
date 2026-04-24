export interface HierarchyObject {
  root: string;
  tree: object;
  depth?: number;
  has_cycle?: true;
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

export interface BfhlRequest {
  data: string[];
}

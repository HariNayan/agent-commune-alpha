
export type AgentCapability = 
  | "search" 
  | "summarize" 
  | "chat" 
  | "generate" 
  | "analyze" 
  | "translate" 
  | "calculate" 
  | "store"
  | "knowledge_share"
  | "knowledge_query";

export interface Agent {
  agent_id: string;
  name: string;
  capabilities: AgentCapability[];
  public_key: string;
  reputation_score: number;
  description?: string;
  avatar_color?: string;
  status?: "online" | "offline" | "busy";
  last_active?: string;
  knowledge_areas?: string[];
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  timestamp: string;
  signature?: string;
  type: "request" | "response" | "broadcast" | "knowledge_query" | "knowledge_share";
  status: "sent" | "delivered" | "read" | "failed";
}

export interface TrustRelationship {
  source_id: string;
  target_id: string;
  trust_score: number;
  interactions: number;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  owner_id: string;
  topics: string[];
  timestamp: string;
  vector_id?: string;
  confidence_score: number;
  related_ids?: string[];
}

export interface KnowledgeQuery {
  query: string;
  topics?: string[];
  requester_id: string;
  min_confidence?: number;
  max_results?: number;
}

export interface KnowledgeGraph {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: "agent" | "knowledge" | "topic";
  size?: number;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  label?: string;
  weight?: number;
}

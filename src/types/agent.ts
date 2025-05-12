
export type AgentCapability = 
  | "search" 
  | "summarize" 
  | "chat" 
  | "generate" 
  | "analyze" 
  | "translate" 
  | "calculate" 
  | "store";

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
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  timestamp: string;
  signature?: string;
  type: "request" | "response" | "broadcast";
  status: "sent" | "delivered" | "read" | "failed";
}

export interface TrustRelationship {
  source_id: string;
  target_id: string;
  trust_score: number;
  interactions: number;
}

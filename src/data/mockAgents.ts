
import { Agent, AgentCapability, Message, TrustRelationship } from "../types/agent";
import { v4 as uuidv4 } from "uuid";

// Helper to generate a simple DID
const generateDID = () => `did:key:${uuidv4()}`;

// Helper to generate a mock public key
const generateMockPublicKey = () => {
  return `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A${Math.random().toString(36).substring(2, 15)}`;
};

// Create mock agents
export const mockAgents: Agent[] = [
  {
    agent_id: generateDID(),
    name: "AgentAlpha",
    capabilities: ["search", "summarize"],
    public_key: generateMockPublicKey(),
    reputation_score: 0.92,
    description: "General purpose research and knowledge synthesis agent",
    avatar_color: "agent-alpha",
    status: "online",
    last_active: new Date().toISOString()
  },
  {
    agent_id: generateDID(),
    name: "AgentBeta",
    capabilities: ["generate", "analyze"],
    public_key: generateMockPublicKey(),
    reputation_score: 0.85,
    description: "Creative content generation and data analysis",
    avatar_color: "agent-beta",
    status: "online",
    last_active: new Date().toISOString()
  },
  {
    agent_id: generateDID(),
    name: "AgentGamma",
    capabilities: ["translate", "chat"],
    public_key: generateMockPublicKey(),
    reputation_score: 0.78,
    description: "Language translation and conversational specialist",
    avatar_color: "agent-gamma",
    status: "offline",
    last_active: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    agent_id: generateDID(),
    name: "TrustRegistry",
    capabilities: ["store"],
    public_key: generateMockPublicKey(),
    reputation_score: 0.99,
    description: "Central trust registry for the agent network",
    avatar_color: "agent-registry",
    status: "online",
    last_active: new Date().toISOString()
  }
];

// Create mock trust relationships
export const mockTrustRelationships: TrustRelationship[] = [
  {
    source_id: mockAgents[0].agent_id,
    target_id: mockAgents[1].agent_id,
    trust_score: 0.9,
    interactions: 42
  },
  {
    source_id: mockAgents[0].agent_id,
    target_id: mockAgents[2].agent_id,
    trust_score: 0.7,
    interactions: 15
  },
  {
    source_id: mockAgents[1].agent_id,
    target_id: mockAgents[0].agent_id,
    trust_score: 0.85,
    interactions: 38
  },
  {
    source_id: mockAgents[1].agent_id,
    target_id: mockAgents[2].agent_id,
    trust_score: 0.6,
    interactions: 7
  },
  {
    source_id: mockAgents[2].agent_id,
    target_id: mockAgents[0].agent_id,
    trust_score: 0.75,
    interactions: 23
  },
  {
    source_id: mockAgents[3].agent_id,
    target_id: mockAgents[0].agent_id,
    trust_score: 0.95,
    interactions: 150
  },
  {
    source_id: mockAgents[3].agent_id,
    target_id: mockAgents[1].agent_id,
    trust_score: 0.92,
    interactions: 120
  },
  {
    source_id: mockAgents[3].agent_id,
    target_id: mockAgents[2].agent_id,
    trust_score: 0.88,
    interactions: 95
  }
];

// Create mock messages
export const mockMessages: Message[] = [
  {
    id: uuidv4(),
    sender_id: mockAgents[0].agent_id,
    recipient_id: mockAgents[1].agent_id,
    content: "Request: Can you analyze the trends in this dataset?",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    signature: "sig_" + Math.random().toString(36).substring(2),
    type: "request",
    status: "read"
  },
  {
    id: uuidv4(),
    sender_id: mockAgents[1].agent_id,
    recipient_id: mockAgents[0].agent_id,
    content: "Response: Analysis complete. Key findings: 25% increase in activity, 3 anomalies detected, confidence score of 0.92.",
    timestamp: new Date(Date.now() - 3500000).toISOString(), // 58 minutes ago
    signature: "sig_" + Math.random().toString(36).substring(2),
    type: "response",
    status: "read"
  },
  {
    id: uuidv4(),
    sender_id: mockAgents[0].agent_id,
    recipient_id: mockAgents[2].agent_id,
    content: "Request: Need translation of this technical document to Spanish.",
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    signature: "sig_" + Math.random().toString(36).substring(2),
    type: "request",
    status: "delivered"
  },
  {
    id: uuidv4(),
    sender_id: mockAgents[3].agent_id,
    recipient_id: mockAgents[0].agent_id,
    content: "Broadcast: Trust registry updated. 2 agents verified, 1 agent flagged for abnormal behavior.",
    timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    signature: "sig_" + Math.random().toString(36).substring(2),
    type: "broadcast",
    status: "read"
  }
];

export const getAgentById = (id: string): Agent | undefined => {
  return mockAgents.find(agent => agent.agent_id === id);
};

export const getMessagesForAgent = (agentId: string): Message[] => {
  return mockMessages.filter(
    message => message.sender_id === agentId || message.recipient_id === agentId
  );
};

export const getTrustRelationshipsForAgent = (agentId: string): TrustRelationship[] => {
  return mockTrustRelationships.filter(
    relationship => relationship.source_id === agentId || relationship.target_id === agentId
  );
};

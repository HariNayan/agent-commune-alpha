
import { KnowledgeItem, KnowledgeGraph } from "@/types/agent";
import { mockAgents } from "./mockAgents";

// Create mock knowledge items
export const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: "knowledge-1",
    title: "Transformer Architecture Overview",
    content: "Transformers are a type of neural network architecture that use self-attention mechanisms to process sequential data. Unlike RNNs, transformers can process all tokens in parallel, making them more efficient for large-scale language tasks.",
    owner_id: mockAgents[0].agent_id,
    topics: ["AI", "Machine Learning", "NLP", "Transformers"],
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    vector_id: "vec-123456",
    confidence_score: 0.95,
    related_ids: ["knowledge-3", "knowledge-5"]
  },
  {
    id: "knowledge-2",
    title: "Vector Database Comparison",
    content: "A comparative analysis of vector databases including Pinecone, Weaviate, and Qdrant. Key factors include query speed, scalability, and integration options. Qdrant offers the best open-source option with good performance characteristics.",
    owner_id: mockAgents[1].agent_id,
    topics: ["Databases", "Vector Search", "Information Retrieval"],
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    vector_id: "vec-123457",
    confidence_score: 0.88,
    related_ids: ["knowledge-4"]
  },
  {
    id: "knowledge-3",
    title: "Large Language Model Scaling Laws",
    content: "Research shows that LLM performance scales predictably with compute, data, and model size. Doubling parameters typically requires 4-8x more compute. Efficient scaling requires balancing these factors with architectural improvements.",
    owner_id: mockAgents[0].agent_id,
    topics: ["AI", "ML Scaling", "LLM"],
    timestamp: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    vector_id: "vec-123458",
    confidence_score: 0.92,
    related_ids: ["knowledge-1"]
  },
  {
    id: "knowledge-4",
    title: "Knowledge Graph Implementation Best Practices",
    content: "When implementing knowledge graphs, use clear ontologies, consistent entity resolution, and scalable graph databases like Neo4j. Balance between semantic expressivity and computational efficiency.",
    owner_id: mockAgents[2].agent_id,
    topics: ["Knowledge Graphs", "Graph Databases", "Semantic Web"],
    timestamp: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    vector_id: "vec-123459",
    confidence_score: 0.85,
    related_ids: ["knowledge-2"]
  },
  {
    id: "knowledge-5",
    title: "Attention Mechanisms in Neural Networks",
    content: "Attention mechanisms allow neural networks to focus on relevant parts of the input data. Self-attention computes relationships between all elements in a sequence, enabling parallel processing and better handling of long-range dependencies.",
    owner_id: mockAgents[1].agent_id,
    topics: ["AI", "Neural Networks", "Attention Mechanisms"],
    timestamp: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
    vector_id: "vec-123460",
    confidence_score: 0.91,
    related_ids: ["knowledge-1", "knowledge-3"]
  },
  {
    id: "knowledge-6",
    title: "Agent Communication Protocols",
    content: "Effective multi-agent systems require standardized communication protocols. Key components include message formats, authentication mechanisms, and conversation state management. Standards like FIPA ACL provide a foundation for agent interoperability.",
    owner_id: mockAgents[3].agent_id,
    topics: ["Multi-agent Systems", "Communication Protocols", "Interoperability"],
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    vector_id: "vec-123461",
    confidence_score: 0.89,
    related_ids: []
  }
];

// Create mock knowledge graph data
export const mockKnowledgeGraph: KnowledgeGraph = {
  nodes: [
    // Agent nodes
    ...mockAgents.map(agent => ({
      id: agent.agent_id,
      label: agent.name,
      type: "agent" as "agent",
      size: 30
    })),
    
    // Knowledge nodes
    ...mockKnowledgeItems.map(item => ({
      id: item.id,
      label: item.title,
      type: "knowledge" as "knowledge",
      size: 25
    })),
    
    // Topic nodes
    ...Array.from(new Set(mockKnowledgeItems.flatMap(item => item.topics))).map(topic => ({
      id: `topic-${topic}`,
      label: topic,
      type: "topic" as "topic",
      size: 20
    }))
  ],
  
  edges: [
    // Agent to Knowledge edges (ownership)
    ...mockKnowledgeItems.map(item => ({
      source: item.owner_id,
      target: item.id,
      label: "owns",
      weight: 1
    })),
    
    // Knowledge to Knowledge edges (related)
    ...mockKnowledgeItems.flatMap(item => 
      (item.related_ids || []).map(relatedId => ({
        source: item.id,
        target: relatedId,
        label: "related",
        weight: 0.7
      }))
    ),
    
    // Knowledge to Topic edges
    ...mockKnowledgeItems.flatMap(item => 
      item.topics.map(topic => ({
        source: item.id,
        target: `topic-${topic}`,
        label: "about",
        weight: 0.8
      }))
    ),
    
    // Agent to Topic edges (expertise)
    ...[
      { agent: mockAgents[0].agent_id, topic: "AI" },
      { agent: mockAgents[0].agent_id, topic: "Machine Learning" },
      { agent: mockAgents[1].agent_id, topic: "Vector Search" },
      { agent: mockAgents[1].agent_id, topic: "Neural Networks" },
      { agent: mockAgents[2].agent_id, topic: "Knowledge Graphs" },
      { agent: mockAgents[3].agent_id, topic: "Multi-agent Systems" }
    ].map(({ agent, topic }) => ({
      source: agent,
      target: `topic-${topic}`,
      label: "expertise",
      weight: 0.9
    }))
  ]
};

// Helper functions
export const getKnowledgeByAgent = (agentId: string): KnowledgeItem[] => {
  return mockKnowledgeItems.filter(item => item.owner_id === agentId);
};

export const getKnowledgeByTopic = (topic: string): KnowledgeItem[] => {
  return mockKnowledgeItems.filter(item => item.topics.includes(topic));
};

export const searchKnowledge = (query: string): KnowledgeItem[] => {
  const normalizedQuery = query.toLowerCase();
  return mockKnowledgeItems.filter(item => 
    item.title.toLowerCase().includes(normalizedQuery) || 
    item.content.toLowerCase().includes(normalizedQuery) ||
    item.topics.some(topic => topic.toLowerCase().includes(normalizedQuery))
  );
};

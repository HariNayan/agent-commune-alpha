
import { useEffect, useState } from "react";
import { KnowledgeGraphNode, KnowledgeGraphEdge } from "@/types/agent";
import { mockKnowledgeGraph } from "@/data/mockKnowledge";

interface KnowledgeGraphProps {
  agentId: string;
}

export function KnowledgeGraph({ agentId }: KnowledgeGraphProps) {
  const [graphData, setGraphData] = useState<{nodes: KnowledgeGraphNode[], edges: KnowledgeGraphEdge[]}>({
    nodes: [],
    edges: []
  });
  
  useEffect(() => {
    // In a real application, we'd fetch this data from a graph database
    // For now, we're using mock data
    
    // Filter to show only nodes and edges relevant to this agent
    const relevantGraph = {
      nodes: mockKnowledgeGraph.nodes.filter(node => 
        node.id.includes(agentId) || 
        mockKnowledgeGraph.edges.some(edge => 
          (edge.source === node.id && edge.target.includes(agentId)) || 
          (edge.target === node.id && edge.source.includes(agentId))
        )
      ),
      edges: mockKnowledgeGraph.edges.filter(edge => 
        edge.source.includes(agentId) || edge.target.includes(agentId)
      )
    };
    
    setGraphData(relevantGraph);
  }, [agentId]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-black/5 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Knowledge Graph Visualization</div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            This visualization shows the knowledge connections between agents, topics, and knowledge items.
            {graphData.nodes.length > 0 && (
              <span> Showing {graphData.nodes.length} nodes and {graphData.edges.length} connections.</span>
            )}
          </p>
        </div>
      </div>
      
      {/* In a real implementation, we would render an actual graph visualization here */}
      {/* using a library like D3.js, Sigma.js, or a React wrapper */}
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        Interactive graph visualization available in next update
      </div>
    </div>
  );
}

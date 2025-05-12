
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentCard } from "@/components/agent/AgentCard";
import { AgentDetail } from "@/components/agent/AgentDetail";
import { MessagingPanel } from "@/components/agent/MessagingPanel";
import { TrustNetworkGraph } from "@/components/agent/TrustNetworkGraph";
import { KnowledgePanel } from "@/components/knowledge/KnowledgePanel";
import { Agent } from "@/types/agent";
import { mockAgents } from "@/data/mockAgents";
import { Shield, MessageSquare, Network, Brain } from "lucide-react";

export function Dashboard() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(mockAgents[0]);
  const [detailAgent, setDetailAgent] = useState<Agent | undefined>(undefined);
  const [detailOpen, setDetailOpen] = useState(false);
  
  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
  };
  
  const handleAgentDetailClick = (agent: Agent) => {
    setDetailAgent(agent);
    setDetailOpen(true);
  };
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary glow shadow-primary">AgentMesh</span> Network
        </h1>
        <p className="text-muted-foreground">
          Secure AI agent identity and communication platform
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Directory */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Agent Directory</h2>
          <div className="grid gap-4">
            {mockAgents.map((agent) => (
              <AgentCard 
                key={agent.agent_id} 
                agent={agent} 
                onClick={() => handleAgentDetailClick(agent)} 
              />
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border shadow-sm p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Operating as:</h2>
                <span className="font-bold text-primary">{selectedAgent.name}</span>
                <span className="agent-id">{selectedAgent.agent_id.substring(0, 12)}...</span>
              </div>
              <button 
                onClick={() => handleAgentDetailClick(selectedAgent)}
                className="text-sm text-primary hover:underline"
              >
                View Profile
              </button>
            </div>
            
            <Tabs defaultValue="messaging" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="messaging" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messaging</span>
                </TabsTrigger>
                <TabsTrigger value="trust" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Trust Metrics</span>
                </TabsTrigger>
                <TabsTrigger value="network" className="flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  <span>Network</span>
                </TabsTrigger>
                <TabsTrigger value="knowledge" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>Knowledge</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="messaging" className="h-[500px]">
                <MessagingPanel activeAgent={selectedAgent} />
              </TabsContent>
              
              <TabsContent value="trust">
                <div className="p-4 space-y-6">
                  <TrustNetworkGraph />
                </div>
              </TabsContent>
              
              <TabsContent value="network">
                <div className="p-4 text-center">
                  <p className="text-muted-foreground">Network visualization coming soon</p>
                  <p className="mt-2">Currently connected to 3 peer agents.</p>
                </div>
              </TabsContent>

              <TabsContent value="knowledge" className="h-[500px]">
                <KnowledgePanel activeAgent={selectedAgent} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <AgentDetail 
        agent={detailAgent} 
        open={detailOpen} 
        onOpenChange={setDetailOpen} 
      />
    </div>
  );
}

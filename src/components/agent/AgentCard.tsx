
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AgentAvatar } from "./AgentAvatar";
import { Agent } from "@/types/agent";
import { formatDistanceToNow } from "date-fns";
import { ShieldCheck, Activity } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const lastActive = agent.last_active 
    ? formatDistanceToNow(new Date(agent.last_active), { addSuffix: true })
    : "unknown";
  
  return (
    <Card 
      className="hover:border-primary/50 transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <AgentAvatar agent={agent} size="md" />
          <div className="space-y-1">
            <h3 className="font-medium">{agent.name}</h3>
            <p className="agent-id text-muted-foreground">{agent.agent_id.substring(0, 16)}...</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{agent.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {agent.capabilities.map((capability) => (
            <Badge key={capability} variant="outline" className="bg-secondary text-xs">
              {capability}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground flex justify-between">
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" />
          <span>{agent.reputation_score.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Activity className="h-3 w-3" />
          <span>Active {lastActive}</span>
        </div>
      </CardFooter>
    </Card>
  );
}


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/types/agent";
import { AgentAvatar } from "./AgentAvatar";
import { formatDistanceToNow } from "date-fns";
import { Copy, ShieldAlert, ShieldCheck, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentDetailProps {
  agent?: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgentDetail({ agent, open, onOpenChange }: AgentDetailProps) {
  if (!agent) return null;

  const copyId = () => {
    navigator.clipboard.writeText(agent.agent_id);
    toast.success("Agent ID copied to clipboard");
  };

  const copyPublicKey = () => {
    navigator.clipboard.writeText(agent.public_key);
    toast.success("Public key copied to clipboard");
  };

  const lastActive = agent.last_active 
    ? formatDistanceToNow(new Date(agent.last_active), { addSuffix: true })
    : "unknown";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Agent Profile
            <Badge variant={agent.status === "online" ? "default" : "outline"}>
              {agent.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            View detailed information about this agent
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="flex items-center gap-4">
            <AgentAvatar agent={agent} size="lg" />
            <div>
              <h2 className="text-xl font-semibold">{agent.name}</h2>
              <p className="agent-id flex items-center gap-1">
                {agent.agent_id}
                <button onClick={copyId} className="hover:text-primary">
                  <Copy className="h-3 w-3" />
                </button>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Capabilities</h3>
            <div className="flex flex-wrap gap-1">
              {agent.capabilities.map((capability) => (
                <Badge key={capability} className="bg-secondary">
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Public Key</h3>
            <div className="relative">
              <div className="p-2 bg-secondary rounded-md font-mono text-xs overflow-hidden text-ellipsis">
                {agent.public_key}
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-2 top-1/2 -translate-y-1/2" 
                onClick={copyPublicKey}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-3 bg-secondary rounded-md">
              <div className="flex items-center gap-1 text-lg font-medium">
                <ShieldCheck className={`h-5 w-5 ${agent.reputation_score > 0.8 ? 'text-green-500' : 'text-amber-500'}`} />
                <span>{agent.reputation_score.toFixed(2)}</span>
              </div>
              <span className="text-xs text-muted-foreground">Reputation Score</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-secondary rounded-md">
              <div className="flex items-center gap-1 text-lg font-medium">
                <Activity className="h-5 w-5 text-blue-500" />
                <span>{lastActive}</span>
              </div>
              <span className="text-xs text-muted-foreground">Last Active</span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline">Message</Button>
            <Button variant="outline" className="text-red-500 hover:text-red-700">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

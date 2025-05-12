
import { Message } from "@/types/agent";
import { getAgentById, mockAgents } from "@/data/mockAgents";
import { AgentAvatar } from "./AgentAvatar";
import { formatDistanceToNow } from "date-fns";
import { CheckCheck, Lock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: Message;
  viewingAgentId: string;
}

export function MessageItem({ message, viewingAgentId }: MessageItemProps) {
  const isSent = message.sender_id === viewingAgentId;
  const otherPartyId = isSent ? message.recipient_id : message.sender_id;
  const otherAgent = getAgentById(otherPartyId);
  
  // Handle for broadcasts which might not have a specific "other" agent
  const displayAgent = isSent ? getAgentById(viewingAgentId) : otherAgent;
  
  if (!displayAgent) return null;
  
  const messageTime = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });
  
  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Lock className="h-3 w-3 text-muted-foreground" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-blue-400" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-green-400" />;
      case "failed":
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getTypeStyles = () => {
    switch (message.type) {
      case "request":
        return "border-l-blue-500 bg-blue-500/5";
      case "response":
        return "border-l-green-500 bg-green-500/5";
      case "broadcast":
        return "border-l-amber-500 bg-amber-500/5";
      default:
        return "border-l-gray-500";
    }
  };
  
  return (
    <div 
      className={cn(
        "p-3 rounded-md mb-2 animate-message-appear border-l-2",
        getTypeStyles(),
        isSent ? "ml-8" : "mr-8"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <AgentAvatar agent={displayAgent} size="sm" showStatus={false} />
          <span className="font-medium text-sm">{displayAgent.name}</span>
          <span className="text-xs text-muted-foreground agent-id">
            {displayAgent.agent_id.substring(0, 10)}...
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">{messageTime}</span>
          {getStatusIcon()}
        </div>
      </div>
      
      <div className="text-sm">
        <div className="text-xs uppercase text-muted-foreground mb-1">
          {message.type}
        </div>
        {message.content}
      </div>
      
      <div className="mt-2 flex items-center gap-1">
        <Lock className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground truncate">
          Signature: {message.signature || "Unsigned"}
        </span>
      </div>
    </div>
  );
}

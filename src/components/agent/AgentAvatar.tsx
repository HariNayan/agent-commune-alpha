
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Agent } from "@/types/agent";

interface AgentAvatarProps {
  agent: Agent;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

export function AgentAvatar({ agent, size = "md", showStatus = true }: AgentAvatarProps) {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "lg":
        return "h-14 w-14";
      default:
        return "h-10 w-10";
    }
  };
  
  // Get the first letter of the agent name
  const firstLetter = agent.name.charAt(0);
  
  // Determine background color based on agent type
  const bgColorClass = `bg-${agent.avatar_color || 'primary'}`;
  
  return (
    <div className="relative">
      <Avatar className={cn(getSize(), "border-2 border-background")}>
        <AvatarFallback className={bgColorClass}>
          {firstLetter}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background h-3 w-3",
            agent.status === "online" ? "bg-green-500" : 
            agent.status === "busy" ? "bg-amber-500" : "bg-gray-500"
          )}
        />
      )}
    </div>
  );
}

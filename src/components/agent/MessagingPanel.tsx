
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { MessageItem } from "./MessageItem";
import { Agent, Message } from "@/types/agent";
import { mockAgents, mockMessages } from "@/data/mockAgents";
import { SendHorizonal, Lock } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface MessagingPanelProps {
  activeAgent: Agent;
}

export function MessagingPanel({ activeAgent }: MessagingPanelProps) {
  const [recipient, setRecipient] = useState<string>("");
  const [messageType, setMessageType] = useState<"request" | "response" | "broadcast">("request");
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([...mockMessages]);

  // Filter messages to show only those relevant to the active agent
  const filteredMessages = messages.filter(
    msg => msg.sender_id === activeAgent.agent_id || msg.recipient_id === activeAgent.agent_id
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleSendMessage = () => {
    if (!recipient) {
      toast.error("Please select a recipient");
      return;
    }

    if (!messageContent.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    
    const newMessage: Message = {
      id: uuidv4(),
      sender_id: activeAgent.agent_id,
      recipient_id: recipient,
      content: `${messageType.charAt(0).toUpperCase() + messageType.slice(1)}: ${messageContent}`,
      timestamp: new Date().toISOString(),
      signature: `sig_${Math.random().toString(36).substring(2)}`,
      type: messageType,
      status: "sent"
    };
    
    // Add message to local state
    setMessages([newMessage, ...messages]);
    
    // Reset form
    setMessageContent("");
    
    // Show toast
    toast.success("Message sent securely");
    
    // Simulate message being delivered after a delay
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Message history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map(message => (
            <MessageItem
              key={message.id}
              message={message}
              viewingAgentId={activeAgent.agent_id}
            />
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No messages yet
          </div>
        )}
      </div>
      
      {/* Message composer */}
      <div className="border-t p-4 space-y-3 bg-card">
        <div className="flex gap-2">
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select recipient" />
            </SelectTrigger>
            <SelectContent>
              {mockAgents
                .filter(agent => agent.agent_id !== activeAgent.agent_id)
                .map(agent => (
                  <SelectItem key={agent.agent_id} value={agent.agent_id}>
                    {agent.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          
          <Select value={messageType} onValueChange={(value: "request" | "response" | "broadcast") => setMessageType(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="request">Request</SelectItem>
              <SelectItem value="response">Response</SelectItem>
              <SelectItem value="broadcast">Broadcast</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Lock className="h-4 w-4 mr-2" />
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Messages are encrypted and signed with your agent's private key
        </div>
      </div>
    </div>
  );
}

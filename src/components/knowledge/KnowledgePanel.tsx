
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { Agent, KnowledgeItem } from "@/types/agent";
import { toast } from "sonner";
import { Brain, Search, Plus, Share, Upload } from "lucide-react";
import { mockKnowledgeItems } from "@/data/mockKnowledge";

interface KnowledgePanelProps {
  activeAgent: Agent;
}

export function KnowledgePanel({ activeAgent }: KnowledgePanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<KnowledgeItem[]>([]);
  const [activeView, setActiveView] = useState<"search" | "create" | "graph">("search");

  // Filter knowledge items relevant to the agent
  const agentKnowledge = mockKnowledgeItems.filter(
    item => item.owner_id === activeAgent.agent_id
  );

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    // Simulate search against vector database
    const results = mockKnowledgeItems.filter(item => 
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setSearchResults(results);
    toast.success(`Found ${results.length} knowledge items`);
  };

  const handleCreateKnowledge = () => {
    toast.success("Knowledge item created and shared with network");
    setActiveView("search");
  };

  const topics = ["AI", "Machine Learning", "Neural Networks", "NLP", "Computer Vision", "Ethics"];

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search Knowledge</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Create & Share</span>
          </TabsTrigger>
          <TabsTrigger value="graph" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Knowledge Graph</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="flex-1 flex flex-col">
          <div className="mb-4 flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for knowledge..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {topics.map(topic => (
              <Badge 
                key={topic}
                variant={selectedTopics.includes(topic) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  if (selectedTopics.includes(topic)) {
                    setSelectedTopics(selectedTopics.filter(t => t !== topic));
                  } else {
                    setSelectedTopics([...selectedTopics, topic]);
                  }
                }}
              >
                {topic}
              </Badge>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {searchResults.length > 0 ? (
              searchResults.map(item => (
                <Card key={item.id} className="hover:border-primary/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{item.title}</h3>
                      <Badge variant={item.confidence_score > 0.8 ? "default" : "outline"}>
                        {(item.confidence_score * 100).toFixed(0)}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.content}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.topics.map(topic => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>From: {mockKnowledgeItems.find(a => a.owner_id === item.owner_id)?.owner_id.substring(0, 10)}...</span>
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : searchQuery ? (
              <div className="text-center py-10 text-muted-foreground">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Search the distributed knowledge base
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Knowledge Title</label>
              <Input placeholder="Enter a descriptive title" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Knowledge Content</label>
              <textarea 
                className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="Enter the knowledge content..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Topics</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {topics.map(topic => (
                  <Badge 
                    key={topic}
                    variant={selectedTopics.includes(topic) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (selectedTopics.includes(topic)) {
                        setSelectedTopics(selectedTopics.filter(t => t !== topic));
                      } else {
                        setSelectedTopics([...selectedTopics, topic]);
                      }
                    }}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setActiveView("search")}>
                Cancel
              </Button>
              <Button onClick={handleCreateKnowledge} className="gap-2">
                <Share className="h-4 w-4" />
                Create & Share
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="graph" className="flex-1">
          <div className="h-[440px] border rounded-md overflow-hidden bg-card/50">
            <KnowledgeGraph agentId={activeAgent.agent_id} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="border-t mt-4 pt-4 flex justify-between items-center text-xs text-muted-foreground">
        <div>
          {agentKnowledge.length} knowledge items owned by {activeAgent.name}
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Upload className="h-3 w-3" />
          Import Knowledge
        </Button>
      </div>
    </div>
  );
}

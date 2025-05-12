
import { useRef, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAgents, mockTrustRelationships } from "@/data/mockAgents";
import { Agent } from "@/types/agent";

// Sample trust score history data
const trustScoreHistory = [
  { month: "Jan", AgentAlpha: 0.7, AgentBeta: 0.65, AgentGamma: 0.6 },
  { month: "Feb", AgentAlpha: 0.75, AgentBeta: 0.68, AgentGamma: 0.63 },
  { month: "Mar", AgentAlpha: 0.78, AgentBeta: 0.72, AgentGamma: 0.65 },
  { month: "Apr", AgentAlpha: 0.82, AgentBeta: 0.75, AgentGamma: 0.7 },
  { month: "May", AgentAlpha: 0.85, AgentBeta: 0.78, AgentGamma: 0.72 },
  { month: "Jun", AgentAlpha: 0.88, AgentBeta: 0.82, AgentGamma: 0.75 },
];

// Sample interaction data
const interactionData = [
  { day: "Mon", interactions: 12 },
  { day: "Tue", interactions: 18 },
  { day: "Wed", interactions: 29 },
  { day: "Thu", interactions: 24 },
  { day: "Fri", interactions: 32 },
  { day: "Sat", interactions: 15 },
  { day: "Sun", interactions: 8 },
];

export function TrustNetworkGraph() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Trust Score Evolution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trustScoreHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis domain={[0.5, 1]} stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                labelStyle={{ color: "#eee" }}
              />
              <Legend />
              <Line type="monotone" dataKey="AgentAlpha" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="AgentBeta" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="AgentGamma" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Network Interactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={interactionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                labelStyle={{ color: "#eee" }}
              />
              <Area 
                type="monotone" 
                dataKey="interactions" 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorInteractions)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { agents } from "@/lib/data" 
export default function AgentListPage() {
  const grouped = {
    available: agents.filter((a) => a.status === "available"),
    busy: agents.filter((a) => a.status === "busy"),
    onLeave: agents.filter((a) => a.status === "offline"),
  }

  const renderAgentCard = (agent: typeof agents[number]) => (
    <Card key={agent.id}>
      <CardHeader>
        <CardTitle>{agent.name}</CardTitle>
        <CardDescription className="capitalize text-muted-foreground">
          {agent.status}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <p><strong>Current Calls:</strong> {agent.currentCalls}</p>
          <p><strong>Total Calls:</strong> {agent.totalCalls}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Agent List</h2>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-700">✅ Available Agents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {grouped.available.length
            ? grouped.available.map(renderAgentCard)
            : <p className="text-muted-foreground">No agents available.</p>}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-yellow-600">🟡 Busy Agents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {grouped.busy.length
            ? grouped.busy.map(renderAgentCard)
            : <p className="text-muted-foreground">No busy agents.</p>}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-red-600">❌ On Leave</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {grouped.onLeave.length
            ? grouped.onLeave.map(renderAgentCard)
            : <p className="text-muted-foreground">No agents on leave.</p>}
        </div>
      </div>
    </div>
  )
}

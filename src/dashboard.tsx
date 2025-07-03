"use client"

import * as React from "react"
import {
  Phone,
  Users,
  PlayCircle,
  BarChart3,
  Settings,
  PhoneCall,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Play,
  Pause,
  Volume2,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import VoiceSimulator  from "@/components/VoiceSimulator"
import AgentListPage from "@/components/AgentListPage"

// Mock data
const callHistory = [
  {
    id: "1",
    callerName: "John Smith",
    phoneNumber: "+1 (555) 123-4567",
    time: "2024-01-15 14:30:22",
    duration: "5:23",
    status: "completed",
    agent: "AI Agent 1",
  },
  {
    id: "2",
    callerName: "Sarah Johnson",
    phoneNumber: "+1 (555) 987-6543",
    time: "2024-01-15 14:25:10",
    duration: "3:45",
    status: "missed",
    agent: "AI Agent 2",
  },
  {
    id: "3",
    callerName: "Mike Wilson",
    phoneNumber: "+1 (555) 456-7890",
    time: "2024-01-15 14:20:05",
    duration: "7:12",
    status: "completed",
    agent: "AI Agent 1",
  },
  {
    id: "4",
    callerName: "Emily Davis",
    phoneNumber: "+1 (555) 321-0987",
    time: "2024-01-15 14:15:33",
    duration: "2:18",
    status: "in-progress",
    agent: "AI Agent 3",
  },
]

const agents = [
  { id: "1", name: "AI Agent 1", status: "available", currentCalls: 2, totalCalls: 45 },
  { id: "2", name: "AI Agent 2", status: "busy", currentCalls: 1, totalCalls: 38 },
  { id: "3", name: "AI Agent 3", status: "available", currentCalls: 0, totalCalls: 52 },
  { id: "4", name: "AI Agent 4", status: "offline", currentCalls: 0, totalCalls: 29 },
]

const recordings = [
  {
    id: "1",
    callerName: "John Smith",
    date: "2024-01-15",
    duration: "5:23",
    size: "2.1 MB",
    transcription: "Customer inquiry about product pricing and availability...",
  },
  {
    id: "2",
    callerName: "Mike Wilson",
    date: "2024-01-15",
    duration: "7:12",
    size: "3.2 MB",
    transcription: "Technical support request for software installation...",
  },
  {
    id: "3",
    callerName: "Lisa Brown",
    date: "2024-01-14",
    duration: "4:56",
    size: "2.8 MB",
    transcription: "Billing inquiry and account update request...",
  },
]

const phoneNumbers = [
  { id: "1", number: "+1 (555) 100-0001", status: "active", assigned: "Main Line" },
  { id: "2", number: "+1 (555) 100-0002", status: "active", assigned: "Support" },
  { id: "3", number: "+1 (555) 100-0003", status: "inactive", assigned: "Sales" },
  { id: "4", number: "+1 (555) 100-0004", status: "active", assigned: "Emergency" },
]

const webhooks = [
  { id: "1", name: "Call Started", url: "https://api.example.com/call-started", status: "active" },
  { id: "2", name: "Call Ended", url: "https://api.example.com/call-ended", status: "active" },
  { id: "3", name: "Recording Ready", url: "https://api.example.com/recording", status: "inactive" },
]

function AppSidebar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string
  setActiveSection: (section: string) => void
}) {
  const menuItems = [
    { id: "calls", title: "Call History", icon: Phone },
    { id: "agents", title: "Agent Status", icon: Users },
    { id: "recordings", title: "Recordings", icon: PlayCircle },
    { id: "analytics", title: "Analytics", icon: BarChart3 },
    { id: "admin", title: "Admin Panel", icon: Settings },
    { id: "simulator", title: "Call Simulator", icon: PhoneCall },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <PhoneCall className="h-6 w-6" />
          <span className="font-semibold text-lg">AI Call Center</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => setActiveSection(item.id)} isActive={activeSection === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
function CallHistorySection() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "missed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Missed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary">
            <AlertCircle className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Call History</h2>
        <div className="flex gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
          <CardDescription>Overview of all incoming and outgoing calls</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caller</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callHistory.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-medium">{call.callerName}</TableCell>
                  <TableCell>{call.phoneNumber}</TableCell>
                  <TableCell>{call.time}</TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>{getStatusBadge(call.status)}</TableCell>
                  <TableCell>{call.agent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function AgentStatusSection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Agent Status</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Busy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Details</CardTitle>
          <CardDescription>Current status and performance of all AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{agent.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Current: {agent.currentCalls}</p>
                  <p className="text-sm text-muted-foreground">Total: {agent.totalCalls}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RecordingsSection() {
  const [playingId, setPlayingId] = React.useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Call Recordings</h2>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Bulk Download
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Recordings</CardTitle>
          <CardDescription>Audio recordings and transcriptions of calls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recordings.map((recording) => (
              <div key={recording.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{recording.callerName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {recording.date} • {recording.duration} • {recording.size}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPlayingId(playingId === recording.id ? null : recording.id)}
                    >
                      {playingId === recording.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {playingId === recording.id && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="h-4 w-4" />
                      <Progress value={33} className="flex-1" />
                      <span className="text-sm">1:45 / {recording.duration}</span>
                    </div>
                  </div>
                )}
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm">
                    <strong>Transcription:</strong> {recording.transcription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Real-time Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Call Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1:23</div>
            <div className="flex items-center text-sm text-green-600">
              <Clock className="h-4 w-4 mr-1" />
              -8% from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              +2.1% from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <div className="flex items-center text-sm text-red-600">
              <XCircle className="h-4 w-4 mr-1" />
              +3 from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Call Volume Trend</CardTitle>
            <CardDescription>Hourly call volume for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {[12, 18, 25, 32, 28, 35, 42, 38, 45, 52, 48, 55].map((height, index) => (
                <div key={index} className="flex-1 bg-primary rounded-t" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>9AM</span>
              <span>12PM</span>
              <span>3PM</span>
              <span>6PM</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Status Distribution</CardTitle>
            <CardDescription>Breakdown of call outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Completed</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">In Progress</span>
                <span className="text-sm font-medium">16%</span>
              </div>
              <Progress value={16} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Missed</span>
                <span className="text-sm font-medium">6%</span>
              </div>
              <Progress value={6} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AdminSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <Tabs defaultValue="numbers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="numbers">Phone Numbers</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="numbers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phone Number Pool</CardTitle>
                  <CardDescription>Manage your available phone numbers</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Number
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Phone Number</DialogTitle>
                      <DialogDescription>Add a new phone number to your pool</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="number">Phone Number</Label>
                        <Input id="number" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div>
                        <Label htmlFor="assignment">Assignment</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main">Main Line</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Add Number</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {phoneNumbers.map((number) => (
                    <TableRow key={number.id}>
                      <TableCell className="font-medium">{number.number}</TableCell>
                      <TableCell>
                        <Badge variant={number.status === "active" ? "default" : "secondary"}>{number.status}</Badge>
                      </TableCell>
                      <TableCell>{number.assigned}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhook Configuration</CardTitle>
                  <CardDescription>Manage webhook endpoints for call events</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Webhook
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Webhook</DialogTitle>
                      <DialogDescription>Configure a new webhook endpoint</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="webhook-name">Name</Label>
                        <Input id="webhook-name" placeholder="Webhook name" />
                      </div>
                      <div>
                        <Label htmlFor="webhook-url">URL</Label>
                        <Input id="webhook-url" placeholder="https://api.example.com/webhook" />
                      </div>
                      <div>
                        <Label htmlFor="webhook-events">Events</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select events" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="call-started">Call Started</SelectItem>
                            <SelectItem value="call-ended">Call Ended</SelectItem>
                            <SelectItem value="recording-ready">Recording Ready</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Add Webhook</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell className="font-mono text-sm">{webhook.url}</TableCell>
                      <TableCell>
                        <Badge variant={webhook.status === "active" ? "default" : "secondary"}>{webhook.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DashboardContent({ activeSection }: { activeSection: string }) {
  const renderSection = () => {
    switch (activeSection) {
      case "calls":
        return <CallHistorySection />
      case "agents":
        return <AgentListPage />
      case "recordings":
        return <RecordingsSection />
      case "analytics":
        return <AnalyticsSection />
      case "admin":
        return <AdminSection />
      case "simulator":
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Simulate Call Interaction</h2>
            <VoiceSimulator />
          </>
        )
      default:
        return <CallHistorySection />
    }
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center gap-4 mb-6">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">System Online</span>
        </div>
      </div>
      {renderSection()}
    </div>
  )
}
export default function Component() {
  const [activeSection, setActiveSection] = React.useState("calls")

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <DashboardContent activeSection={activeSection} />
      </div>
    </SidebarProvider>
  )
}

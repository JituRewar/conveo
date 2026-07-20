'use client'

import * as React from 'react'
import {
  Sparkles,
  Command,
  Zap,
  Activity,
  QrCode,
  ArrowRight,
  ShieldAlert,
  Filter,
  Eye,
} from 'lucide-react'
import { Sidebar } from '@/components/navigation/sidebar'
import { CommandPalette } from '@/components/navigation/command-palette'
import { PageContainer } from '@/components/layout/page-container'
import { SectionContainer } from '@/components/layout/section-container'
import { GridSystem, GridItem } from '@/components/layout/grid-system'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Toaster, toast } from '@/components/ui/toast'
import { EmptyState } from '@/components/ui/empty-state'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'

export default function DesignSystemPage() {
  const [cmdOpen, setCmdOpen] = React.useState(false)
  const [sidebarOpen] = React.useState(true)
  const [activeNav, setActiveNav] = React.useState('dashboard')
  const [switchChecked, setSwitchChecked] = React.useState(true)
  const [checkboxChecked, setCheckboxChecked] = React.useState(true)
  const [radioVal, setRadioVal] = React.useState('fast')
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <div className="bg-background text-on-background flex min-h-screen flex-col font-sans">
      <Toaster position="top-right" />

      <div className="relative flex flex-1">
        {/* Sidebar */}
        <div className={sidebarOpen ? 'block' : 'hidden lg:block'}>
          <Sidebar activeId={activeNav} onSelect={setActiveNav} />
        </div>

        {/* Main Canvas Area */}
        <main className="flex-1 overflow-x-hidden">
          <PageContainer
            title="Conveo Design System"
            description="Production-grade UI primitives, operational dark logic, bento grid tokens, and GSAP micro-animations."
            actions={
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCmdOpen(true)}
                  leftIcon={<Command className="h-4 w-4" />}
                >
                  Command Palette (⌘K)
                </Button>
                <Button
                  variant="primaryPill"
                  onClick={() =>
                    toast.success('Operational Design System Initialized')
                  }
                  leftIcon={<Sparkles className="h-4 w-4" />}
                >
                  Run Toast Test
                </Button>
              </div>
            }
          >
            {/* Design Tokens Explorer */}
            <SectionContainer
              title="1. Semantic Color Tokens & Surface Scale"
              subtitle="Tailwind v4 theme tokens matching Stitch Design specs"
            >
              <GridSystem cols={12} gap="md">
                <GridItem span={3}>
                  <Card
                    elevation={0}
                    className="border-outline-variant/30 border p-4"
                  >
                    <div className="bg-surface border-outline-variant/30 mb-2 h-10 w-full rounded-lg border" />
                    <p className="font-mono text-xs font-semibold">surface</p>
                    <p className="text-on-surface-variant/70 text-[11px]">
                      Main Canvas Surface
                    </p>
                  </Card>
                </GridItem>
                <GridItem span={3}>
                  <Card
                    elevation={0}
                    className="border-outline-variant/30 border p-4"
                  >
                    <div className="bg-surface-container-low mb-2 h-10 w-full rounded-lg" />
                    <p className="font-mono text-xs font-semibold">
                      surface-container-low
                    </p>
                    <p className="text-on-surface-variant/70 text-[11px]">
                      Sidebar / Recessed Tier
                    </p>
                  </Card>
                </GridItem>
                <GridItem span={3}>
                  <Card
                    elevation={0}
                    className="border-outline-variant/30 border p-4"
                  >
                    <div className="bg-primary mb-2 h-10 w-full rounded-lg" />
                    <p className="text-primary font-mono text-xs font-semibold">
                      primary (#2C2ABC / #C0C1FF)
                    </p>
                    <p className="text-on-surface-variant/70 text-[11px]">
                      Brand Focal Actions
                    </p>
                  </Card>
                </GridItem>
                <GridItem span={3}>
                  <Card
                    elevation={0}
                    className="border-outline-variant/30 border p-4"
                  >
                    <div className="mb-2 h-10 w-full rounded-lg bg-emerald-500" />
                    <p className="font-mono text-xs font-semibold text-emerald-500">
                      status-live (#10B981)
                    </p>
                    <p className="text-on-surface-variant/70 text-[11px]">
                      High-Visibility Operational
                    </p>
                  </Card>
                </GridItem>
              </GridSystem>
            </SectionContainer>

            {/* Interactive Showcase Tabs */}
            <div className="mt-10">
              <Tabs defaultValue="components">
                <TabsList className="mb-6" variant="pills">
                  <TabsTrigger value="components">
                    UI Primitives (24+)
                  </TabsTrigger>
                  <TabsTrigger value="bento">
                    Bento Grids & 3D Cards
                  </TabsTrigger>
                  <TabsTrigger value="data">
                    Operational Table & Pagination
                  </TabsTrigger>
                  <TabsTrigger value="overlays">Dialogs & Drawers</TabsTrigger>
                  <TabsTrigger value="states">
                    Feedback & Empty States
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Reusable UI Components */}
                <TabsContent value="components" className="space-y-8">
                  {/* Buttons */}
                  <Card variant="bento">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-base">
                        Buttons & Interactive Triggers
                      </CardTitle>
                      <CardDescription>
                        Micro-interactions powered by GSAP scale transitions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-3 px-0 pb-0">
                      <Button variant="default">Primary Button</Button>
                      <Button
                        variant="primaryPill"
                        leftIcon={<Zap className="h-4 w-4" />}
                      >
                        Pill Action
                      </Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost Item</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button size="touchMin" variant="default">
                        Touch Min (48px)
                      </Button>
                      <Button isLoading variant="default">
                        Loading...
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Form Inputs & Controls */}
                  <GridSystem cols={12} gap="lg">
                    <GridItem span={6}>
                      <Card variant="bento">
                        <CardHeader className="px-0 pt-0">
                          <CardTitle className="text-base">
                            Text Inputs & Search Variants
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-0 pb-0">
                          <div>
                            <label className="mb-1.5 block text-xs font-medium">
                              Standard Input
                            </label>
                            <Input placeholder="Enter attendee email address..." />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-medium">
                              Search Pill Input
                            </label>
                            <Input
                              variant="pill"
                              placeholder="Search live telemetry logs..."
                              shortcutHint="CTRL + K"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-medium">
                              Textarea with Counter
                            </label>
                            <Textarea
                              placeholder="Write broadcast message..."
                              maxLength={150}
                              showCount
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </GridItem>

                    <GridItem span={6}>
                      <Card variant="bento">
                        <CardHeader className="px-0 pt-0">
                          <CardTitle className="text-base">
                            Toggles, Select & Radio
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 px-0 pb-0">
                          <div>
                            <label className="mb-1.5 block text-xs font-medium">
                              Select Dropdown
                            </label>
                            <Select defaultValue="vip">
                              <SelectTrigger>
                                <SelectValue placeholder="Select ticket tier" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">
                                  General Admission
                                </SelectItem>
                                <SelectItem value="vip">
                                  VIP Backstage Pass
                                </SelectItem>
                                <SelectItem value="press">
                                  Press & Media
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="bg-surface-container-low flex items-center justify-between rounded-lg p-3">
                            <div>
                              <p className="text-sm font-semibold">
                                Live Scanner Sync
                              </p>
                              <p className="text-on-surface-variant text-xs">
                                Auto-sync QR codes to gate nodes
                              </p>
                            </div>
                            <Switch
                              checked={switchChecked}
                              onCheckedChange={setSwitchChecked}
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <Checkbox
                              id="terms"
                              checked={checkboxChecked}
                              onCheckedChange={(c) => setCheckboxChecked(!!c)}
                            />
                            <label
                              htmlFor="terms"
                              className="text-on-surface cursor-pointer text-sm"
                            >
                              Enforce multi-factor barcode validation
                            </label>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-medium">
                              Scanning Speed
                            </label>
                            <RadioGroup
                              value={radioVal}
                              onValueChange={setRadioVal}
                              className="flex gap-4"
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="fast" id="fast" />
                                <label htmlFor="fast" className="text-xs">
                                  Ultra Fast (100ms)
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  value="high-sec"
                                  id="high-sec"
                                />
                                <label htmlFor="high-sec" className="text-xs">
                                  High Security
                                </label>
                              </div>
                            </RadioGroup>
                          </div>
                        </CardContent>
                      </Card>
                    </GridItem>
                  </GridSystem>

                  {/* Badges, Avatars, Tooltips */}
                  <Card variant="bento">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-base">
                        Badges, Avatars & Tooltips
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-6 px-0 pb-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Standard</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="live">LIVE GATE ONLINE</Badge>
                        <Badge variant="tag">SCAN_ID_9921</Badge>
                        <Badge variant="destructive">ERROR</Badge>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar status="online">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <Avatar status="busy">
                          <AvatarFallback className="bg-amber-500/20 text-amber-600">
                            ST
                          </AvatarFallback>
                        </Avatar>
                        <Avatar status="offline">
                          <AvatarFallback className="bg-slate-400/20">
                            AK
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              Hover for Tooltip
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Gate 4 Node: Online & Synced</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            Open Popover
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                          <h4 className="mb-1 text-sm font-semibold">
                            Gate Telemetry
                          </h4>
                          <p className="text-on-surface-variant text-xs">
                            Processed 2,410 tickets in the last hour.
                          </p>
                        </PopoverContent>
                      </Popover>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 2: Bento Grids & 3D Cards */}
                <TabsContent value="bento">
                  <GridSystem bentoPattern="bentoMain" gap="lg">
                    <GridItem span={8}>
                      <Card
                        variant="bento"
                        is3D
                        className="flex h-full flex-col justify-between"
                      >
                        <div>
                          <div className="mb-4 flex items-center justify-between">
                            <Badge variant="live">REALTIME TELEMETRY</Badge>
                            <QrCode className="text-primary h-6 w-6" />
                          </div>
                          <h3 className="mb-2 text-xl font-bold tracking-tight">
                            3D Tilt Bento Action Hub
                          </h3>
                          <p className="text-on-surface-variant max-w-lg text-sm">
                            Layered surface levels (0, 1, 2) communicate visual
                            depth with low-opacity borders and subtle indigo
                            glow transitions.
                          </p>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                          <Button
                            variant="primaryPill"
                            rightIcon={<ArrowRight className="h-4 w-4" />}
                          >
                            Explore Cluster
                          </Button>
                          <Button variant="ghost">View Metrics</Button>
                        </div>
                      </Card>
                    </GridItem>

                    <GridItem span={4}>
                      <div className="space-y-4">
                        <Card variant="actionHub">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 text-primary rounded-xl p-2.5">
                              <Activity className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                Scanning Throughput
                              </p>
                              <p className="text-on-surface-variant font-mono text-xs">
                                1,420 Scans / min
                              </p>
                            </div>
                          </div>
                        </Card>

                        <Card variant="actionHub">
                          <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-500">
                              <ShieldAlert className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                Node Security
                              </p>
                              <p className="text-on-surface-variant font-mono text-xs">
                                Zero Breach Anomalies
                              </p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </GridItem>
                  </GridSystem>
                </TabsContent>

                {/* Tab 3: Operational Table */}
                <TabsContent value="data">
                  <Card variant="bento">
                    <CardHeader className="flex flex-row items-center justify-between px-0 pt-0">
                      <div>
                        <CardTitle className="text-base">
                          High-Density Operational Activity Feed
                        </CardTitle>
                        <CardDescription>
                          Strict 1px border-low bottom borders & monospaced
                          status badges
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Filter className="h-3.5 w-3.5" />}
                      >
                        Filter Feed
                      </Button>
                    </CardHeader>
                    <CardContent className="px-0 pb-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>TIMESTAMP</TableHead>
                            <TableHead>SCANNER NODE</TableHead>
                            <TableHead>ATTENDEE TIER</TableHead>
                            <TableHead>GATE ID</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead className="text-right">
                              ACTIONS
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              time: '14:02:11.082',
                              node: 'NODE_ALPHA_01',
                              tier: 'VIP Access Pass',
                              gate: 'Gate A - North',
                              status: 'VERIFIED',
                            },
                            {
                              time: '14:02:09.431',
                              node: 'NODE_ALPHA_04',
                              tier: 'General Ticket',
                              gate: 'Gate B - South',
                              status: 'VERIFIED',
                            },
                            {
                              time: '14:02:05.110',
                              node: 'NODE_BETA_02',
                              tier: 'Press Accreditation',
                              gate: 'Media Gate',
                              status: 'DENIED',
                            },
                          ].map((row, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-mono text-xs font-semibold">
                                {row.time}
                              </TableCell>
                              <TableCell className="font-mono text-xs">
                                {row.node}
                              </TableCell>
                              <TableCell className="text-xs font-medium">
                                {row.tier}
                              </TableCell>
                              <TableCell className="text-on-surface-variant text-xs">
                                {row.gate}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    row.status === 'VERIFIED'
                                      ? 'live'
                                      : 'destructive'
                                  }
                                  className="text-[10px]"
                                >
                                  {row.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      <div className="mt-4">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#" isActive>
                                1
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab 4: Dialogs & Drawers */}
                <TabsContent value="overlays">
                  <Card variant="bento">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-base">
                        Modals & Slide-Over Drawers
                      </CardTitle>
                      <CardDescription>
                        Integrated with backdrop blur and accessible Radix UI
                        dialog states
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4 px-0 pb-0">
                      <Button
                        variant="default"
                        onClick={() => setDialogOpen(true)}
                      >
                        Trigger Modal Dialog
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setDrawerOpen(true)}
                      >
                        Trigger Slide-Over Drawer
                      </Button>
                    </CardContent>
                  </Card>

                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Node Calibration</DialogTitle>
                        <DialogDescription>
                          This action will re-synchronize gate scanner #4 with
                          the cluster master node.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-2">
                        <Input placeholder="Enter node passcode..." />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="ghost"
                          onClick={() => setDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => {
                            setDialogOpen(false)
                            toast.success('Node Calibrated')
                          }}
                        >
                          Confirm Calibration
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerContent side="right">
                      <DrawerHeader>
                        <DrawerTitle>
                          Operational Telemetry Inspector
                        </DrawerTitle>
                        <DrawerDescription>
                          Real-time node diagnostic logs
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="space-y-3 py-4 font-mono text-xs">
                        <div className="bg-surface-container border-outline-variant/30 rounded-lg border p-3">
                          <p className="font-semibold text-emerald-500">
                            [SYS_OK] Latency: 12ms
                          </p>
                          <p className="text-on-surface-variant/80">
                            Buffer status: 0 dropouts
                          </p>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </TabsContent>

                {/* Tab 5: Feedback & System States */}
                <TabsContent value="states" className="space-y-6">
                  <Alert variant="info">
                    <AlertTitle>System Notice</AlertTitle>
                    <AlertDescription>
                      Automatic gate node failover enabled for Cluster-Alpha.
                    </AlertDescription>
                  </Alert>

                  <GridSystem cols={12} gap="lg">
                    <GridItem span={4}>
                      <Card variant="bento" className="p-4">
                        <p className="text-on-surface-variant mb-2 text-center text-xs font-semibold">
                          Empty State Primitive
                        </p>
                        <EmptyState
                          title="No Scanners Found"
                          description="Connect a QR scanner node to begin telemetry stream."
                        />
                      </Card>
                    </GridItem>

                    <GridItem span={4}>
                      <Card variant="bento" className="p-4">
                        <p className="text-on-surface-variant mb-2 text-center text-xs font-semibold">
                          Loading State Primitive
                        </p>
                        <LoadingState label="Calibrating 3D GSAP Loader..." />
                      </Card>
                    </GridItem>

                    <GridItem span={4}>
                      <Card variant="bento" className="p-4">
                        <p className="text-on-surface-variant mb-2 text-center text-xs font-semibold">
                          Error State Primitive
                        </p>
                        <ErrorState
                          title="Connection Timed Out"
                          onRetry={() => toast.info('Retrying connection...')}
                        />
                      </Card>
                    </GridItem>
                  </GridSystem>
                </TabsContent>
              </Tabs>
            </div>
          </PageContainer>
        </main>
      </div>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  )
}

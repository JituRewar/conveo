'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/navigation/sidebar'
import { TopNavigation } from '@/components/navigation/top-navigation'
import { CommandPalette } from '@/components/navigation/command-palette'
import { Footer } from '@/components/navigation/footer'
import { OrganizationDTO } from '@/features/organization/types/organization.types'

interface DashboardShellClientProps {
  children: React.ReactNode
  organizations: OrganizationDTO[]
  activeOrgId: string | null
}

export function DashboardShellClient({
  children,
  organizations,
  activeOrgId,
}: DashboardShellClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col antialiased">
      {/* Global Command Palette */}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />

      <div className="relative flex flex-1">
        {/* Sidebar Component */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavigation
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
            organizations={organizations}
            activeOrgId={activeOrgId}
          />

          <main className="min-h-[calc(100vh-8rem)] flex-1">{children}</main>

          <Footer />
        </div>
      </div>
    </div>
  )
}

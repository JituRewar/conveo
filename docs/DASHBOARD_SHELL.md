# Dashboard Shell & Application Layout Architecture

This document describes the design, component hierarchy, keyboard navigation, and state handlers for the **Dashboard Shell & Application Layout** of **Conveo**.

---

## 🏗️ Layout Architecture

The Dashboard Shell provides a unified, authenticated application layout wrapping all `/dashboard/...` routes.

```
RootLayout (app/layout.tsx)
  └── ClerkProvider + AppProviders (ThemeProvider)
        └── DashboardLayout (app/dashboard/layout.tsx - Server Component)
              └── DashboardShellClient (app/dashboard/dashboard-shell-client.tsx - Client Component)
                    ├── CommandPalette (Global Ctrl + K Search Modal)
                    ├── Sidebar (Collapsible Desktop Sidebar & Mobile Drawer)
                    └── TopNavigation
                          ├── Mobile Menu Toggle
                          ├── Dynamic Breadcrumbs
                          ├── Search Trigger (Ctrl + K)
                          ├── OrganizationSwitcher
                          ├── NotificationPanel
                          ├── ThemeToggle
                          └── UserMenu
```

---

## 🧭 Key Layout Components

### 1. Collapsible Sidebar (`src/components/navigation/sidebar.tsx`)
- **Desktop**: Collapsible state (`w-64` vs `w-20`) with expand/collapse toggle (`PanelLeftClose` / `PanelLeftOpen`).
- **Mobile**: Responsive drawer overlay (`AnimatePresence` + sliding drawer).
- **Active Route Highlighting**: Uses `usePathname()` to apply glowing active states on links (`/dashboard`, `/dashboard/events`, `/dashboard/tickets`, `/dashboard/attendees`, `/dashboard/analytics`, `/dashboard/organization/team`, `/dashboard/organization`, `/dashboard/settings`).

### 2. Top Navigation Bar (`src/components/navigation/top-navigation.tsx`)
- Integrates `OrganizationSwitcher` (multi-tenant workspace switcher), `CommandPalette` search button, `NotificationPanel` UI, `ThemeToggle`, and `UserMenu`.
- Sticky header with glassmorphism backdrop blur (`backdrop-blur-2xl bg-surface-container-low/85`).

### 3. Command Palette (`Ctrl + K`) (`src/components/navigation/command-palette.tsx`)
- Triggered globally via `Ctrl + K` or `Cmd + K` keybinding or clicking search input.
- Provides instant client-side filtering across 13+ section routes.
- Supports full keyboard controls (`ArrowUp`, `ArrowDown`, `Enter`, `ESC`).

### 4. Dynamic Breadcrumbs (`src/components/navigation/breadcrumb.tsx`)
- Auto-generates readable breadcrumb trails from URL path segments (e.g. `/dashboard/organization/team` -> `Dashboard` > `Organization` > `Team Members`).

### 5. Notification Panel UI (`src/components/navigation/notification-panel.tsx`)
- Bell icon trigger with unread counter badge.
- Interactive popover panel with sample operational notifications (*Email Sent*, *VIP Ticket Checked In*, *New Member Joined*, *Role Updated*).
- Support for "All" / "Unread" tabs and "Mark All Read" frontend actions.

### 6. User Menu (`src/components/navigation/user-menu.tsx`)
- Clerk user avatar trigger displaying user's name, email, and role badge.
- Quick navigation links to User Profile (`/profile`), Active Workspace (`/dashboard/organization`), Settings (`/dashboard/settings`), Theme Toggle, and Clerk Sign Out.

---

## 🚦 Layout States

| State | File Location | Trigger |
| :--- | :--- | :--- |
| **Loading** | `src/app/dashboard/loading.tsx` | Next.js Suspense boundary skeleton |
| **Error** | `src/app/dashboard/error.tsx` | Global error boundary with retry action |
| **404 Not Found** | `src/app/not-found.tsx` | Unmatched route handler |
| **401 Unauthorized**| `src/app/unauthorized/page.tsx` | Unauthenticated access attempt |
| **403 Forbidden** | `src/app/forbidden/page.tsx` | Insufficient RBAC permission attempt |

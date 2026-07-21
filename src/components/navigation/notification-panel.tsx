'use client'

import React, { useState } from 'react'
import {
  Bell,
  CheckCheck,
  Trash2,
  Mail,
  Ticket,
  ShieldAlert,
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface MockNotification {
  id: string
  title: string
  message: string
  type: 'EMAIL' | 'IN_APP' | 'SYSTEM'
  isRead: boolean
  timestamp: string
}

const INITIAL_NOTIFICATIONS: MockNotification[] = [
  {
    id: 'notif-1',
    title: 'Registration Confirmed',
    message:
      'Your registration for Global AI & Cloud Summit 2026 has been confirmed!',
    type: 'EMAIL',
    isRead: false,
    timestamp: '10m ago',
  },
  {
    id: 'notif-2',
    title: 'VIP Ticket Checked In',
    message: 'Attendee Eva Garcia scanned QR pass at Gate 1.',
    type: 'IN_APP',
    isRead: false,
    timestamp: '1h ago',
  },
  {
    id: 'notif-3',
    title: 'New Member Joined',
    message: 'Bob Smith accepted your invitation as Organizer.',
    type: 'IN_APP',
    isRead: true,
    timestamp: '3h ago',
  },
  {
    id: 'notif-4',
    title: 'Role Permission Changed',
    message: 'Your role in TechVentures Global was updated to Admin.',
    type: 'SYSTEM',
    isRead: true,
    timestamp: '1d ago',
  },
]

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<MockNotification[]>(
    INITIAL_NOTIFICATIONS,
  )
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL')

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const displayed = notifications.filter((n) =>
    filter === 'UNREAD' ? !n.isRead : true,
  )

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n)),
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-on-surface hover:bg-surface-container-high relative h-9 w-9 rounded-full transition-all"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="bg-primary text-on-primary shadow-primary/30 absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-extrabold shadow-sm">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="border-outline-variant/30 bg-surface-container-low/95 w-80 overflow-hidden p-0 shadow-2xl backdrop-blur-2xl sm:w-96"
      >
        {/* Header */}
        <div className="border-outline-variant/20 flex items-center justify-between border-b p-3.5">
          <div className="flex items-center gap-2">
            <h3 className="text-on-surface text-sm font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="live" className="px-1.5 py-0 text-[10px]">
                {unreadCount} NEW
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllRead}
                className="text-primary hover:text-primary-container h-7 px-2 text-[11px]"
              >
                <CheckCheck className="mr-1 h-3.5 w-3.5" /> Read All
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-error hover:text-error h-7 px-2 text-[11px]"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="border-outline-variant/20 bg-surface-container/40 flex items-center border-b p-1">
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`flex-1 rounded-lg py-1 text-[11px] font-bold transition-all ${
              filter === 'ALL'
                ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                : 'text-on-surface-variant/70 hover:text-on-surface'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('UNREAD')}
            className={`flex-1 rounded-lg py-1 text-[11px] font-bold transition-all ${
              filter === 'UNREAD'
                ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                : 'text-on-surface-variant/70 hover:text-on-surface'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notification Items */}
        <div className="divide-outline-variant/10 max-h-80 divide-y overflow-y-auto">
          {displayed.length === 0 ? (
            <div className="text-on-surface-variant space-y-1 py-10 text-center text-xs">
              <Bell className="text-on-surface-variant/40 mx-auto mb-1 h-6 w-6" />
              <p className="font-semibold">No notifications</p>
            </div>
          ) : (
            displayed.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => toggleRead(n.id)}
                className={`flex w-full items-start gap-3 p-3.5 text-left transition-colors ${
                  n.isRead
                    ? 'hover:bg-surface-container/40 opacity-70'
                    : 'bg-primary/5 hover:bg-primary/10'
                }`}
              >
                <div className="bg-primary/15 text-primary mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                  {n.type === 'EMAIL' ? (
                    <Mail className="h-3.5 w-3.5" />
                  ) : n.type === 'IN_APP' ? (
                    <Ticket className="h-3.5 w-3.5" />
                  ) : (
                    <ShieldAlert className="h-3.5 w-3.5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-on-surface truncate text-xs font-bold">
                      {n.title}
                    </span>
                    <span className="text-on-surface-variant/60 shrink-0 font-mono text-[10px]">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-on-surface-variant mt-0.5 line-clamp-2 text-[11px] leading-snug">
                    {n.message}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

/**
 * Role-Based Access Control (RBAC) definitions for Conveo.
 */
export type UserRole = 'Owner' | 'Admin' | 'Organizer' | 'Volunteer' | 'Viewer'

export type Permission =
  | 'org:manage'
  | 'org:read'
  | 'event:create'
  | 'event:update'
  | 'event:delete'
  | 'event:read'
  | 'ticket:checkin'
  | 'ticket:manage'
  | 'analytics:view'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  Owner: [
    'org:manage',
    'org:read',
    'event:create',
    'event:update',
    'event:delete',
    'event:read',
    'ticket:checkin',
    'ticket:manage',
    'analytics:view',
  ],
  Admin: [
    'org:manage',
    'org:read',
    'event:create',
    'event:update',
    'event:delete',
    'event:read',
    'ticket:checkin',
    'ticket:manage',
    'analytics:view',
  ],
  Organizer: [
    'org:read',
    'event:create',
    'event:update',
    'event:read',
    'ticket:checkin',
    'ticket:manage',
    'analytics:view',
  ],
  Volunteer: ['org:read', 'event:read', 'ticket:checkin'],
  Viewer: ['org:read', 'event:read'],
}

export interface AuthUserSession {
  userId: string
  email: string | null
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
  role: UserRole
  orgId: string | null
  permissions: Permission[]
}

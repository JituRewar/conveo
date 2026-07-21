import { Role, InvitationStatus } from '@/generated/prisma'

export interface OrganizationDTO {
  id: string
  name: string
  slug: string
  description?: string | null
  logoUrl?: string | null
  website?: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  role?: Role
  _count?: {
    members: number
    events: number
  }
}

export interface MemberDTO {
  id: string
  userId: string
  organizationId: string
  role: Role
  createdAt: Date
  user: {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    bio?: string | null
    createdAt: Date
  }
}

export interface InvitationDTO {
  id: string
  email: string
  organizationId: string
  role: Role
  status: InvitationStatus
  token: string
  expiresAt: Date
  createdAt: Date
  inviter?: {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
  }
}

export interface AuditLogDTO {
  id: string
  action: string
  entityType?: string | null
  entityId?: string | null
  details?: unknown
  ipAddress?: string | null
  createdAt: Date
  user?: {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
  } | null
}

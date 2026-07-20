import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {
  AuthUserSession,
  Permission,
  ROLE_PERMISSIONS,
  UserRole,
} from '../types/auth.types'

/**
 * Retrieves the current user's session and role metadata from Clerk server-side context.
 */
export async function getCurrentUserSession(): Promise<AuthUserSession | null> {
  const { userId, orgId, orgRole } = await auth()

  if (!userId) {
    return null
  }

  const user = await currentUser()
  if (!user) {
    return null
  }

  // Derive role from orgRole public metadata or default to Viewer
  const userRole: UserRole =
    (orgRole as UserRole) || (user.publicMetadata.role as UserRole) || 'Viewer'
  const permissions = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.Viewer

  return {
    userId,
    email: user.emailAddresses[0]?.emailAddress ?? null,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    role: userRole,
    orgId: orgId ?? null,
    permissions,
  }
}

/**
 * Checks whether the current user has a specific role.
 */
export async function hasRole(requiredRole: UserRole): Promise<boolean> {
  const session = await getCurrentUserSession()
  if (!session) return false
  return session.role === requiredRole || session.role === 'Owner'
}

/**
 * Checks whether the current user has a specific permission.
 */
export async function hasPermission(permission: Permission): Promise<boolean> {
  const session = await getCurrentUserSession()
  if (!session) return false
  return session.permissions.includes(permission)
}

/**
 * Server-side guard requiring a specific role, redirecting if unauthorized.
 */
export async function requireRole(
  requiredRole: UserRole,
): Promise<AuthUserSession> {
  const session = await getCurrentUserSession()
  if (!session) {
    redirect('/sign-in')
  }

  const isAuthorized = session.role === requiredRole || session.role === 'Owner'
  if (!isAuthorized) {
    redirect('/dashboard?error=unauthorized')
  }

  return session
}

/**
 * Server-side guard requiring a specific permission, redirecting if unauthorized.
 */
export async function requirePermission(
  permission: Permission,
): Promise<AuthUserSession> {
  const session = await getCurrentUserSession()
  if (!session) {
    redirect('/sign-in')
  }

  if (!session.permissions.includes(permission)) {
    redirect('/dashboard?error=unauthorized')
  }

  return session
}

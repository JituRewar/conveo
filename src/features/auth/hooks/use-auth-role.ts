'use client'

import { useUser } from '@clerk/nextjs'
import { Permission, ROLE_PERMISSIONS, UserRole } from '../types/auth.types'

export function useAuthRole() {
  const { user, isLoaded, isSignedIn } = useUser()

  const role: UserRole = (user?.publicMetadata?.role as UserRole) || 'Viewer'

  const permissions: Permission[] =
    ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.Viewer

  const checkHasRole = (requiredRole: UserRole): boolean => {
    if (!isSignedIn) return false
    if (role === 'Owner') return true
    return role === requiredRole
  }

  const checkHasPermission = (permission: Permission): boolean => {
    if (!isSignedIn) return false
    return permissions.includes(permission)
  }

  return {
    user,
    role,
    permissions,
    isLoaded,
    isSignedIn,
    hasRole: checkHasRole,
    hasPermission: checkHasPermission,
  }
}

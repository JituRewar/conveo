import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AuthErrorAlertProps {
  message?: string | null
  title?: string
}

export function AuthErrorAlert({
  message,
  title = 'Authentication Error',
}: AuthErrorAlertProps) {
  if (!message) return null

  return (
    <Alert
      variant="destructive"
      className="bg-error-container/20 border-error/40 text-on-surface mb-4"
    >
      <AlertCircle className="text-error h-4 w-4" />
      <AlertTitle className="text-error text-sm font-semibold">
        {title}
      </AlertTitle>
      <AlertDescription className="text-on-surface-variant mt-0.5 text-xs">
        {message}
      </AlertDescription>
    </Alert>
  )
}

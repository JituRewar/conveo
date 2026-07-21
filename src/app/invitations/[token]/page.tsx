import React from 'react'
import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { invitationService } from '@/services/invitation.service'
import { AcceptInvitationCard } from '@/features/organization/components/accept-invitation-card'

interface InvitationPageProps {
  params: Promise<{
    token: string
  }>
}

export default async function InvitationAcceptPage({
  params,
}: InvitationPageProps) {
  const { token } = await params
  const { userId } = await auth()

  const invitation = await invitationService
    .getInvitationByToken(token)
    .catch(() => null)

  if (!invitation) {
    notFound()
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4 sm:p-6">
      <AcceptInvitationCard
        invitation={
          invitation as unknown as Parameters<
            typeof AcceptInvitationCard
          >[0]['invitation']
        }
        isSignedIn={!!userId}
      />
    </div>
  )
}

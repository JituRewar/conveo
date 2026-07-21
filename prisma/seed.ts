import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is required for seeding database.')
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting Conveo database seeding...')

  // 1. CLEANUP EXISTING DATA (in reverse dependency order)
  console.log('🧹 Cleaning up existing records...')
  await prisma.auditLog.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.review.deleteMany()
  await prisma.waitlistEntry.deleteMany()
  await prisma.refund.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.ticket.deleteMany()
  await prisma.registration.deleteMany()
  await prisma.ticketType.deleteMany()
  await prisma.eventMedia.deleteMany()
  await prisma.eventTagOnEvent.deleteMany()
  await prisma.eventTag.deleteMany()
  await prisma.event.deleteMany()
  await prisma.venue.deleteMany()
  await prisma.eventCategory.deleteMany()
  await prisma.invitation.deleteMany()
  await prisma.membership.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  // 2. SEED USERS
  console.log('👤 Seeding Users...')
  const ownerUser = await prisma.user.create({
    data: {
      id: 'usr_alice_owner',
      email: 'alice.chen@conveo.io',
      firstName: 'Alice',
      lastName: 'Chen',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'Event operations Lead & Tech Founder',
      phoneNumber: '+1-555-0192',
    },
  })

  const orgUser = await prisma.user.create({
    data: {
      id: 'usr_bob_organizer',
      email: 'bob.smith@techops.io',
      firstName: 'Bob',
      lastName: 'Smith',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      bio: 'Senior Technical Event Coordinator',
      phoneNumber: '+1-555-0143',
    },
  })

  const volUser = await prisma.user.create({
    data: {
      id: 'usr_carol_volunteer',
      email: 'carol.vance@events.org',
      firstName: 'Carol',
      lastName: 'Vance',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      bio: 'Community Volunteer Lead',
    },
  })

  const attendee1 = await prisma.user.create({
    data: {
      id: 'usr_dave_attendee',
      email: 'dave.miller@example.com',
      firstName: 'Dave',
      lastName: 'Miller',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      bio: 'Fullstack Software Engineer',
    },
  })

  const attendee2 = await prisma.user.create({
    data: {
      id: 'usr_eva_attendee',
      email: 'eva.garcia@example.com',
      firstName: 'Eva',
      lastName: 'Garcia',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      bio: 'Product Designer & AI Enthusiast',
    },
  })

  // 3. SEED ORGANIZATIONS
  console.log('🏢 Seeding Organizations...')
  const techOrg = await prisma.organization.create({
    data: {
      id: 'org_techventures',
      name: 'TechVentures Global',
      slug: 'techventures-global',
      description: 'Host of world-class technology, AI, and developer conferences.',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
      website: 'https://techventures.example.com',
    },
  })

  // 4. SEED MEMBERSHIPS
  console.log('👥 Seeding Memberships...')
  await prisma.membership.createMany({
    data: [
      {
        userId: ownerUser.id,
        organizationId: techOrg.id,
        role: 'OWNER',
      },
      {
        userId: orgUser.id,
        organizationId: techOrg.id,
        role: 'ORGANIZER',
      },
      {
        userId: volUser.id,
        organizationId: techOrg.id,
        role: 'VOLUNTEER',
      },
    ],
  })

  // 5. SEED INVITATIONS
  console.log('✉️ Seeding Invitations...')
  await prisma.invitation.create({
    data: {
      email: 'david.dev@example.com',
      organizationId: techOrg.id,
      inviterId: ownerUser.id,
      role: 'VOLUNTEER',
      status: 'PENDING',
      token: 'inv_tok_987654321',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days in future
    },
  })

  // 6. SEED EVENT CATEGORIES & VENUES
  console.log('📍 Seeding Categories & Venues...')
  const techCat = await prisma.eventCategory.create({
    data: {
      name: 'Technology & AI',
      slug: 'technology-ai',
      description: 'Conferences and developer summits focused on emerging tech.',
    },
  })

  const designCat = await prisma.eventCategory.create({
    data: {
      name: 'Design & UX',
      slug: 'design-ux',
      description: 'Workshops and talks on product design, UI/UX, and research.',
    },
  })

  const sfVenue = await prisma.venue.create({
    data: {
      name: 'Silicon Valley Convention Center',
      address: '500 Convention Way',
      city: 'San Jose',
      state: 'CA',
      country: 'USA',
      postalCode: '95110',
      latitude: 37.3382,
      longitude: -121.8863,
      capacity: 2500,
    },
  })

  // 7. SEED TAGS
  console.log('🏷️ Seeding Event Tags...')
  const tagAI = await prisma.eventTag.create({
    data: { name: 'Artificial Intelligence', slug: 'ai' },
  })
  const tagCloud = await prisma.eventTag.create({
    data: { name: 'Cloud Computing', slug: 'cloud' },
  })
  const tagNext = await prisma.eventTag.create({
    data: { name: 'Next.js', slug: 'nextjs' },
  })

  // 8. SEED EVENTS
  console.log('📅 Seeding Events...')
  const mainEvent = await prisma.event.create({
    data: {
      organizationId: techOrg.id,
      categoryId: techCat.id,
      venueId: sfVenue.id,
      title: 'Global AI & Cloud Summit 2026',
      slug: 'global-ai-cloud-summit-2026',
      description:
        'Join 500+ leaders and builders for a 2-day deep dive into generative AI, serverless infrastructure, and cloud scale.',
      shortDescription: 'The flagship event for AI & Cloud engineering.',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      isVirtual: false,
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days future
      endDate: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
      status: 'REGISTRATION_OPEN',
      capacity: 500,
      tags: {
        create: [{ tagId: tagAI.id }, { tagId: tagCloud.id }],
      },
    },
  })

  const virtualEvent = await prisma.event.create({
    data: {
      organizationId: techOrg.id,
      categoryId: designCat.id,
      title: 'Design Systems & Next.js UI Masterclass',
      slug: 'design-systems-nextjs-masterclass',
      description: 'An interactive hands-on masterclass building production design systems.',
      shortDescription: 'Build modern UI design systems from scratch.',
      coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12',
      isVirtual: true,
      virtualMeetingUrl: 'https://meet.conveo.io/room/design-masterclass-2026',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
      status: 'PUBLISHED',
      capacity: 200,
      tags: {
        create: [{ tagId: tagNext.id }],
      },
    },
  })

  // 9. SEED TICKET TYPES
  console.log('🎟️ Seeding Ticket Types...')
  await prisma.ticketType.create({
    data: {
      eventId: mainEvent.id,
      name: 'General Admission (Free)',
      description: 'Access to keynote sessions and community hall.',
      price: 0,
      capacity: 200,
      sold: 1,
    },
  })

  const earlyBirdPass = await prisma.ticketType.create({
    data: {
      eventId: mainEvent.id,
      name: 'Early Bird Developer Pass',
      description: 'Full 2-day access to all technical sessions and workshops.',
      price: 4900, // $49.00
      capacity: 150,
      sold: 1,
    },
  })

  const vipPass = await prisma.ticketType.create({
    data: {
      eventId: mainEvent.id,
      name: 'VIP All-Access Pass',
      description: 'Full access + VIP lounge, speaker dinner, and recordings.',
      price: 19900, // $199.00
      capacity: 50,
      sold: 1,
    },
  })

  // 10. SEED REGISTRATIONS, TICKETS & PAYMENTS
  console.log('💳 Seeding Registrations, Tickets & Payments...')
  
  // Registration 1: Dave Miller (Early Bird Pass)
  const reg1 = await prisma.registration.create({
    data: {
      eventId: mainEvent.id,
      userId: attendee1.id,
      ticketTypeId: earlyBirdPass.id,
      registrationCode: 'REG-DAVE-AI2026',
      attendeeName: `${attendee1.firstName} ${attendee1.lastName}`,
      attendeeEmail: attendee1.email,
      quantity: 1,
      totalAmount: 4900,
      status: 'CONFIRMED',
    },
  })

  await prisma.ticket.create({
    data: {
      registrationId: reg1.id,
      ticketTypeId: earlyBirdPass.id,
      userId: attendee1.id,
      ticketCode: 'TCK-AI2026-DAVE-001',
      status: 'ISSUED',
    },
  })

  await prisma.payment.create({
    data: {
      registrationId: reg1.id,
      userId: attendee1.id,
      amount: 4900,
      currency: 'USD',
      status: 'SUCCESS',
      provider: 'RAZORPAY',
      razorpayOrderId: 'order_ai_summit_dave_01',
      razorpayPaymentId: 'pay_ai_summit_dave_01',
      paidAt: new Date(),
    },
  })

  // Registration 2: Eva Garcia (VIP Pass - Checked in)
  const reg2 = await prisma.registration.create({
    data: {
      eventId: mainEvent.id,
      userId: attendee2.id,
      ticketTypeId: vipPass.id,
      registrationCode: 'REG-EVA-AI2026',
      attendeeName: `${attendee2.firstName} ${attendee2.lastName}`,
      attendeeEmail: attendee2.email,
      quantity: 1,
      totalAmount: 19900,
      status: 'CONFIRMED',
    },
  })

  const ticket2 = await prisma.ticket.create({
    data: {
      registrationId: reg2.id,
      ticketTypeId: vipPass.id,
      userId: attendee2.id,
      ticketCode: 'TCK-AI2026-EVA-002',
      status: 'CHECKED_IN',
      checkedInAt: new Date(),
      checkedInByUserId: orgUser.id,
    },
  })

  await prisma.payment.create({
    data: {
      registrationId: reg2.id,
      userId: attendee2.id,
      amount: 19900,
      currency: 'USD',
      status: 'SUCCESS',
      provider: 'RAZORPAY',
      razorpayOrderId: 'order_ai_summit_eva_02',
      razorpayPaymentId: 'pay_ai_summit_eva_02',
      paidAt: new Date(),
    },
  })

  // 11. SEED WAITLIST ENTRIES
  console.log('⏳ Seeding Waitlist Entries...')
  await prisma.waitlistEntry.create({
    data: {
      eventId: virtualEvent.id,
      userId: attendee1.id,
      status: 'WAITING',
      priority: 1,
    },
  })

  // 12. SEED REVIEWS
  console.log('⭐ Seeding Reviews...')
  await prisma.review.create({
    data: {
      eventId: mainEvent.id,
      userId: attendee2.id,
      ticketId: ticket2.id,
      rating: 5,
      comment:
        'Incredible event! Flawless QR check-in experience and world-class technical keynotes.',
    },
  })

  // 13. SEED MEDIA ASSETS
  console.log('🖼️ Seeding Media Assets...')
  await prisma.eventMedia.create({
    data: {
      organizationId: techOrg.id,
      eventId: mainEvent.id,
      uploaderId: orgUser.id,
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      fileName: 'ai_summit_hero_banner.jpg',
      fileType: 'image/jpeg',
      fileSize: 2048500,
      altText: 'Global AI & Cloud Summit 2026 Cover Banner',
    },
  })

  // 14. SEED NOTIFICATIONS
  console.log('🔔 Seeding Notifications...')
  await prisma.notification.createMany({
    data: [
      {
        userId: attendee1.id,
        type: 'EMAIL',
        title: 'Registration Confirmed',
        message: 'Your registration for Global AI & Cloud Summit 2026 has been confirmed!',
        isRead: true,
        readAt: new Date(),
      },
      {
        userId: attendee2.id,
        type: 'IN_APP',
        title: 'Welcome to VIP Lounge',
        message: 'Your VIP QR ticket is active. Present it at gate 1 for instant check-in.',
        isRead: false,
      },
    ],
  })

  // 15. SEED AUDIT LOGS
  console.log('📋 Seeding Audit Logs...')
  await prisma.auditLog.createMany({
    data: [
      {
        userId: ownerUser.id,
        organizationId: techOrg.id,
        action: 'EVENT_CREATE',
        entityType: 'Event',
        entityId: mainEvent.id,
        details: { title: mainEvent.title, status: mainEvent.status },
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      },
      {
        userId: attendee2.id,
        organizationId: techOrg.id,
        action: 'TICKET_CHECKIN',
        entityType: 'Ticket',
        entityId: ticket2.id,
        details: { checkedInBy: orgUser.id, ticketCode: ticket2.ticketCode },
        ipAddress: '10.0.0.42',
      },
    ],
  })

  console.log('✅ Conveo database successfully seeded!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

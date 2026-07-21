# Conveo Database Layer Documentation (Milestone 4)

This directory contains the production-ready Prisma ORM schema, migrations, and seed script for **Conveo**, a multi-tenant event operations platform.

---

## 🛠️ Technology Stack & Configuration

- **Database Engine**: PostgreSQL (Neon Serverless PostgreSQL)
- **ORM**: Prisma ORM v7.8+ (`@prisma/client`, `@prisma/adapter-pg`)
- **Schema Location**: `prisma/schema.prisma`
- **Config Location**: `prisma.config.ts`
- **Generated Client Path**: `src/generated/prisma`

---

## 📐 Entity Catalog & Enums

### Domain Enums (`8`)
1. **`Role`**: `OWNER`, `ORGANIZER`, `VOLUNTEER`
2. **`EventStatus`**: `DRAFT`, `PUBLISHED`, `REGISTRATION_OPEN`, `REGISTRATION_CLOSED`, `COMPLETED`, `ARCHIVED`
3. **`TicketStatus`**: `CREATED`, `ISSUED`, `CHECKED_IN`, `EXPIRED`
4. **`RegistrationStatus`**: `PENDING`, `CONFIRMED`, `CANCELLED`
5. **`PaymentStatus`**: `PENDING`, `SUCCESS`, `FAILED`, `REFUNDED`
6. **`InvitationStatus`**: `PENDING`, `ACCEPTED`, `DECLINED`, `EXPIRED`
7. **`NotificationType`**: `EMAIL`, `IN_APP`
8. **`WaitlistStatus`**: `WAITING`, `PROMOTED`, `EXPIRED`, `CANCELLED`

---

### Domain Models (`19`)

| Module | Model | Primary Key | Description |
| :--- | :--- | :--- | :--- |
| **Auth & User** | `User` | `cuid()` | Platform user (synced with Clerk authentication) |
| **Organization** | `Organization` | `cuid()` | Tenant owning events, members, and branding |
| | `Membership` | `cuid()` | Junction table linking `User` to `Organization` with a `Role` |
| | `Invitation` | `cuid()` | Pending email invitations to join an organization |
| **Event Management** | `EventCategory` | `cuid()` | Event classification taxonomy |
| | `Venue` | `cuid()` | Physical location details for non-virtual events |
| | `Event` | `cuid()` | Core event entity owned by an Organization |
| | `EventTag` | `cuid()` | Tag taxonomy for searching and filtering |
| | `EventTagOnEvent` | `(eventId, tagId)` | Junction table for Event <-> Tag many-to-many relation |
| | `EventMedia` | `cuid()` | Uploaded images and media assets for events/organizations |
| **Ticketing & Registration** | `TicketType` | `cuid()` | Pass options (Free/Paid) with pricing and capacities |
| | `Registration` | `cuid()` | User reservation for an event ticket |
| | `Ticket` | `cuid()` | Issued digital ticket with unique QR `ticketCode` |
| **Payments** | `Payment` | `cuid()` | Financial transaction linked to a Registration |
| | `Refund` | `cuid()` | Refund record associated with a Payment |
| **Operations & Engagement**| `WaitlistEntry` | `cuid()` | Queue entry when an event/ticket type reaches capacity |
| | `Review` | `cuid()` | Post-attendance rating and feedback (checked-in tickets only) |
| | `Notification` | `cuid()` | System communications (Email & In-App) |
| | `AuditLog` | `cuid()` | Immutable audit trail for administrative/financial actions |

---

## 🔗 High-Level Relationships

```
User ↔ Membership ↔ Organization
Organization → Events
Organization → Invitations
Event → TicketTypes
Event → Registrations
Registration → Ticket
Registration → Payment → Refund
Event → WaitlistEntries
Event → Reviews (from checked-in tickets)
User → Notifications
System → AuditLogs
```

---

## 🔒 Constraints & Unique Keys

- **User Organization Membership**: `@@unique([userId, organizationId])` prevents duplicate memberships in the same organization.
- **Event Slug per Organization**: `@@unique([organizationId, slug])` ensures clean event URLs per tenant.
- **Registration per User per Event**: `@@unique([eventId, userId])` prevents duplicate registrations by the same user.
- **Waitlist per User per Event**: `@@unique([eventId, userId])` limits waitlist entries to 1 per user per event.
- **Review per Event per User**: `@@unique([eventId, userId])` and `ticketId @unique` enforce 1 review per ticketed attendee.
- **QR / Token Uniqueness**: `registrationCode`, `ticketCode`, `token` (Invitation), `razorpayOrderId`, `razorpayPaymentId`, `razorpayRefundId` are globally `@unique`.

---

## ⚡ Index Strategy

Comprehensive B-tree indexes are implemented across high-frequency query filters and foreign key columns:
- **Foreign Keys**: `organizationId`, `eventId`, `userId`, `ticketTypeId`, `registrationId`, `paymentId`, `categoryId`, `venueId`.
- **Status Filters**: `Event.status`, `Ticket.status`, `Registration.status`, `Payment.status`, `Invitation.status`, `WaitlistEntry.status`.
- **Chronological Filters**: `createdAt`, `startDate`.

---

## 🛡️ Soft Delete & Cascade Policies

1. **Soft Delete (`deletedAt DateTime?`)**: Supported on `User`, `Organization`, `Event`, and `TicketType` to preserve historical integrity.
2. **Cascade Deletes (`onDelete: Cascade`)**: Used for dependent sub-resources:
   - Deleting `Organization` -> deletes `Membership`, `Invitation`.
   - Deleting `User` -> deletes `Membership`, `WaitlistEntry`, `Review`, `Notification`.
   - Deleting `Event` -> deletes `TicketType`, `WaitlistEntry`, `Review`, `EventTagOnEvent`.
   - Deleting `Registration` -> deletes `Ticket`.
3. **Restrict Deletes (`onDelete: Restrict`)**: Enforced on historical financial/registration entities (`Registration`, `Payment`, `Refund`) to prevent accidental deletion of revenue and attendance records.
4. **Nullify (`onDelete: SetNull`)**: Applied on non-critical metadata (`AuditLog`, `EventMedia`, `Venue`, `Category`).

---

## 🚀 Running Migrations & Seed Script

### 1. Validate Schema
```bash
npm run db:validate
```

### 2. Apply Migrations
```bash
npm run db:migrate
```

### 3. Run Production-Ready Seed Script
```bash
npm run db:seed
```

### 4. Launch Prisma Studio
```bash
npm run db:studio
```

---

## 📦 Seed Data Overview

Running `npm run db:seed` seeds realistic sample data into the database:
- **Users**: 1 Owner (`Alice Chen`), 1 Organizer (`Bob Smith`), 1 Volunteer (`Carol Vance`), 2 Attendees (`Dave Miller`, `Eva Garcia`).
- **Organization**: `TechVentures Global` with multi-tier memberships and pending invitations.
- **Events**: `Global AI & Cloud Summit 2026` (In-person, Open Registration) & `Design Systems Masterclass` (Virtual).
- **Ticket Types**: Free Pass, Early Bird ($49.00), VIP ($199.00).
- **Transactions**: Confirmed Registrations, Issued QR Tickets, Checked-in VIP Ticket, Razorpay Payment records.
- **Engagement**: Waitlist entries, verified 5-star Attendee Reviews, In-App/Email notifications, and system Audit Logs.

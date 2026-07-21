# Organization Management Module Documentation

This document describes the architecture, data models, RBAC authorization model, multi-tenant context resolution, and invitation lifecycle for the **Organization Management** module of **Conveo**.

---

## 🏗️ Architectural Layering

The Organization module strictly adheres to Conveo's multi-layered backend architecture:

```
Client / Server Component
  ↓
Server Actions (src/actions/)
  ↓
Service Layer (src/services/)
  ↓
Repository Layer (src/repositories/)
  ↓
Prisma ORM & PostgreSQL
```

- **Repositories (`src/repositories/`)**: Encapsulate pure database queries (`organization.repository.ts`, `membership.repository.ts`, `invitation.repository.ts`, `audit-log.repository.ts`). No business logic or validation lives here.
- **Services (`src/services/`)**: Enforce business rules, single-owner protections, token generation, active context resolution, and RBAC permission checks (`organization.service.ts`, `membership.service.ts`, `invitation.service.ts`, `rbac.service.ts`).
- **Schemas (`src/schemas/`)**: Zod schemas validating all incoming parameters before execution (`organization.schema.ts`, `membership.schema.ts`, `invitation.schema.ts`).
- **Server Actions (`src/actions/`)**: Next.js Server Actions providing type-safe mutation entrypoints returning standard `{ success, data, error, message }` responses (`organization.actions.ts`, `membership.actions.ts`, `invitation.actions.ts`).

---

## 🔐 Multi-Tenant Active Organization Context

Active workspace context is maintained per user session via a secure HTTP cookie (`conveo_active_org_id`).

1. **Context Resolution Algorithm**:
   - `getActiveOrganizationId()` reads the `conveo_active_org_id` cookie.
   - Verifies the user is an active member of that non-deleted organization.
   - If cookie is missing or invalid, automatically falls back to the user's first joined organization.
   - Saves the resolved active org ID back into the cookie.
2. **Organization Switching**:
   - `OrganizationSwitcher` component triggers `switchOrganizationAction(orgId)`.
   - The action updates the cookie and revalidates Next.js layout caches.

---

## 🛡️ Role-Based Access Control (RBAC)

Conveo implements 5 distinct roles for organization team members:

| Role | Hierarchy Level | Capabilities & Permissions |
| :--- | :---: | :--- |
| **`OWNER`** | `100` | Full administrative control, organization deletion (`org:delete`), member role updates, invitation management, billing, and audit logs. |
| **`ADMIN`** | `80` | Team member management (`member:manage`), invitation sending/revocation (`invitation:manage`), event creation/editing, audit log access. Cannot delete organization or alter Owner roles without Owner status. |
| **`ORGANIZER`** | `60` | Event creation (`event:create`), event editing (`event:manage`), ticket management, QR check-in, read-only team list access. |
| **`VOLUNTEER`** | `40` | On-site attendee QR scanner check-in (`ticket:checkin`), read-only event and team roster access. |
| **`VIEWER`** | `20` | Read-only access to organization profile and published events (`org:read`, `member:read`, `event:read`). |

### Protection Rules
- **At-Least-One-Owner Constraint**: Demoting or removing an `OWNER` requires at least 1 other `OWNER` to exist in the organization.
- **Hierarchy Guard**: An `ADMIN` cannot grant a role equal to or higher than their own (e.g. an Admin cannot promote someone to Owner).

---

## ✉️ Email Invitation Lifecycle

```
[Admin / Owner]
     │
     ▼
Sends Invite (email + role)
     │
     ▼
Generate Secure Token (expires in 7 days) → Save `Invitation` (Status: PENDING)
     │
     ▼
Recipient visits `/invitations/[token]`
     │
     ├── Token Valid & Pending → Click "Accept" → Create `Membership` + Mark `ACCEPTED`
     ├── Token Expired → Mark `EXPIRED` → Display Error
     └── Admin Revokes → Delete `Invitation`
```

---

## 📋 Audit Logging

All administrative operations automatically generate immutable audit log entries in `AuditLog`:
- `ORGANIZATION_CREATE`
- `ORGANIZATION_UPDATE`
- `ORGANIZATION_DELETE`
- `MEMBER_ROLE_UPDATE`
- `MEMBER_REMOVE`
- `MEMBER_LEAVE`
- `INVITATION_SEND`
- `INVITATION_REVOKE`
- `INVITATION_ACCEPT`

import { db } from '@/lib/db'
import { Prisma } from '@/generated/prisma'

export class AuditLogRepository {
  /**
   * Creates an audit log entry.
   */
  async createLog(data: {
    userId?: string
    organizationId?: string
    action: string
    entityType?: string
    entityId?: string
    details?: Prisma.InputJsonValue
    ipAddress?: string
    userAgent?: string
  }) {
    return db.auditLog.create({
      data,
    })
  }

  /**
   * Fetches audit logs for an organization with pagination.
   */
  async findByOrg(organizationId: string, limit = 50, offset = 0) {
    const [items, total] = await Promise.all([
      db.auditLog.findMany({
        where: { organizationId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              imageUrl: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.auditLog.count({
        where: { organizationId },
      }),
    ])

    return { items, total }
  }
}

export const auditLogRepository = new AuditLogRepository()

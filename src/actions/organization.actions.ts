'use server'

import { revalidatePath } from 'next/cache'
import { organizationService } from '@/services/organization.service'
import {
  createOrganizationSchema,
  updateOrganizationSchema,
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from '@/schemas/organization.schema'

export async function createOrganizationAction(input: CreateOrganizationInput) {
  try {
    const validated = createOrganizationSchema.parse(input)
    const organization = await organizationService.createOrganization(validated)
    revalidatePath('/dashboard/organization')
    return {
      success: true,
      data: organization,
      message: 'Organization created successfully!',
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to create organization.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function updateOrganizationAction(
  organizationId: string,
  input: UpdateOrganizationInput,
) {
  try {
    const validated = updateOrganizationSchema.parse(input)
    const updated = await organizationService.updateOrganization(
      organizationId,
      validated,
    )
    revalidatePath('/dashboard/organization')
    revalidatePath('/dashboard/organization/settings')
    return {
      success: true,
      data: updated,
      message: 'Organization settings updated successfully!',
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to update organization settings.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function deleteOrganizationAction(organizationId: string) {
  try {
    await organizationService.deleteOrganization(organizationId)
    revalidatePath('/dashboard')
    return {
      success: true,
      data: null,
      message: 'Organization soft-deleted successfully.',
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete organization.'
    return {
      success: false,
      error: message,
    }
  }
}

export async function switchOrganizationAction(organizationId: string) {
  try {
    await organizationService.setActiveOrganizationId(organizationId)
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/organization')
    return {
      success: true,
      data: { activeOrgId: organizationId },
      message: 'Active organization switched.',
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to switch active organization.'
    return {
      success: false,
      error: message,
    }
  }
}

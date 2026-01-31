import { ProductStatus } from './types'

export const ACTION_TEXT: Record<ProductStatus, string | null> = {
  available: 'Create record',
  preorder: 'Submit for production',
  sold: null,
  archived: null,
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  available: 'available',
  preorder: 'pre-order',
  sold: 'sold',
  archived: 'archived',
}

export const CLOSED_TEXT: Record<string, string> = {
  sold: 'Record closed.',
  archived: 'Archived.',
}

export const SUCCESS_STATUS: Record<string, string> = {
  available: 'confirmed',
  preorder: 'awaiting production',
  crypto: 'pending confirmation',
}

export const ERROR_MESSAGES: Record<string, string> = {
  transaction_failed: 'Transaction failed.\nNo record created.',
  interrupted: 'Process interrupted.\nNo record created.',
  not_confirmed: 'Transaction not confirmed.',
  not_found: 'Record not found.',
}

export const RETURN_URL = 'https://sonofjuliet.cargo.site'

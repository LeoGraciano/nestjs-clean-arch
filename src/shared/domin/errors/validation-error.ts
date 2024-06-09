import { FieldsErrors } from '@/shared/validators/validator-fields.interface'

export class ValidateError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super('Entity Validation Error')
    this.name = 'EntityValidationError'
  }
}

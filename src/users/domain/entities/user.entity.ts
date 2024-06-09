import { Entity } from '@/shared/domain/entities/entity'
import { UserValidatorFactory } from '../validators/user.validator'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type UserProps = {
  name: string
  email: string
  password: string
  createAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props)
    super(props, id)
    this.props.createAt = this.props.createAt ?? new Date()
  }

  update(value: string): void {
    UserEntity.validate({ ...this.props, name: value })
    this.name = value
  }
  updatePassword(value: string): void {
    UserEntity.validate({ ...this.props, password: value })
    this.password = value
  }

  get name() {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  get email() {
    return this.props.email
  }
  get password() {
    return this.props.password
  }

  private set password(value: string) {
    this.props.password = value
  }
  get createAt() {
    return this.props.createAt
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}

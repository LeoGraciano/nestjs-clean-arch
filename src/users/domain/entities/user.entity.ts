export type UserProps = {
  name: string
  email: string
  password: string
  createAt?: Date
}

export class UserEntity {
  constructor(public readonly props: UserProps) {
    this.props.createAt = this.props.createAt ?? new Date()
  }

  get name() {
    return this.props.name
  }
  get email() {
    return this.props.email
  }
  get password() {
    return this.props.password
  }
  get createAt() {
    return this.props.createAt
  }
}

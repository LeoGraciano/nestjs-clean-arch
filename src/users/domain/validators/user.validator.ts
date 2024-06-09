import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '@/shared/validators/class-validator-fields'
import {
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_NAME,
  MAX_LENGTH_PASSWORD,
} from '../entities/rules/const-values'

export class UserRules {
  @MaxLength(MAX_LENGTH_NAME)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(MAX_LENGTH_EMAIL)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @MaxLength(MAX_LENGTH_PASSWORD)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsOptional()
  createAt: Date

  constructor({ name, email, password, createAt }: UserProps) {
    Object.assign(this, { name, email, password, createAt })
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}

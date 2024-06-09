import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'
import { MAX_LENGTH_NAME } from '@/users/domain/entities/rules/const-values'

class StubRules {
  @MaxLength(MAX_LENGTH_NAME)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('ClassValidatorFields integration tests', () => {
  it('Should validate with errors', () => {
    const validator = new StubClassValidatorFields()
    expect(validator.validate(null)).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        `name must be shorter than or equal to ${MAX_LENGTH_NAME} characters`,
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ],
    })
  })
  it('Should validate without errors', () => {
    const validator = new StubClassValidatorFields()
    const data = { name: 'value', price: 10 }
    expect(validator.validate(data)).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(new StubRules(data))
  })
})

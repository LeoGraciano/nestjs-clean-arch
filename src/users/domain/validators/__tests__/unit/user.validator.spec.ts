import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data.builder'
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator'
import { UserProps } from '@/users/domain/entities/user.entity'
import {
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_NAME,
  MAX_LENGTH_PASSWORD,
} from '@/users/domain/entities/rules/const-values'

let sut: UserValidator
let props: UserProps

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder({})
  })

  it('valid case for user validator class', () => {
    const props = UserDataBuilder({})
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })
  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        `name must be shorter than or equal to ${MAX_LENGTH_NAME} characters`,
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: '' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual(['name should not be empty'])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 10 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        `name must be shorter than or equal to ${MAX_LENGTH_NAME} characters`,
      ])
      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 'a'.repeat(MAX_LENGTH_NAME + 1) as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        `name must be shorter than or equal to ${MAX_LENGTH_NAME} characters`,
      ])
    })
  })
  describe('Email field', () => {
    it('Invalidation cases for email field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
        'email must be a string',
        `email must be shorter than or equal to ${MAX_LENGTH_EMAIL} characters`,
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: '' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: 10 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be a string',
        `email must be shorter than or equal to ${MAX_LENGTH_EMAIL} characters`,
      ])
      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: 'a'.repeat(MAX_LENGTH_EMAIL + 1) as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        `email must be shorter than or equal to ${MAX_LENGTH_EMAIL} characters`,
      ])
      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: 'abcde' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual(['email must be an email'])
    })
  })
  describe('Password field', () => {
    it('Invalidation cases for password field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        `password must be shorter than or equal to ${MAX_LENGTH_PASSWORD} characters`,
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        password: '' as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        password: 10 as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        'password must be a string',
        `password must be shorter than or equal to ${MAX_LENGTH_PASSWORD} characters`,
      ])
      isValid = sut.validate({
        ...UserDataBuilder({}),
        password: 'a'.repeat(MAX_LENGTH_PASSWORD + 1) as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors['password']).toStrictEqual([
        `password must be shorter than or equal to ${MAX_LENGTH_PASSWORD} characters`,
      ])
    })
  })
  describe('CreateAt field', () => {
    it('Invalidation cases for createAt field', () => {
      const isValid = sut.validate({ ...props, createAt: 1 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['createAt']).toStrictEqual([
        'createAt must be a Date instance',
      ])
    })
    it('Invalidation cases for createAt field', () => {
      const isValid = sut.validate({ ...props, createAt: '2023' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['createAt']).toStrictEqual([
        'createAt must be a Date instance',
      ])
    })
  })
})

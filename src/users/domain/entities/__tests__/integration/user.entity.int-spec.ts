import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data.builder'
import { UserEntity, UserProps } from '../../user.entity'
import { EntityValidationError } from '@/shared/domin/errors/validation-error'
import {
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_NAME,
  MAX_LENGTH_PASSWORD,
} from '../../rules/const-values'

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(MAX_LENGTH_NAME + 1),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(MAX_LENGTH_EMAIL + 1),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
      props = {
        ...UserDataBuilder({}),
        email: 'aaaaaaaaaa',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(MAX_LENGTH_PASSWORD + 1),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('Should throw an error when creating a user with invalid createAt', () => {
      const props = {
        ...UserDataBuilder({}),
        createAt: '2023' as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })
    it('Should a valid user', () => {
      expect.assertions(0)
      const props = {
        ...UserDataBuilder({}),
      }
      new UserEntity(props)
    })
  })
  describe('Update method', () => {
    let props: UserProps
    let entity: UserEntity

    beforeEach(() => {
      props = UserDataBuilder({})
      entity = new UserEntity(props)
    })
    it('Should update a user', () => {
      expect(() => entity.update(null)).toThrow(EntityValidationError)
      expect(() => entity.update('')).toThrow(EntityValidationError)
      expect(() => entity.update('a'.repeat(MAX_LENGTH_NAME + 1))).toThrow(
        EntityValidationError,
      )
      expect(() => entity.update(10 as any)).toThrow(EntityValidationError)
    })
    it('Should a valid user', () => {
      expect.assertions(0)
      const props = {
        ...UserDataBuilder({}),
      }
      const entity = new UserEntity(props)
      entity.update('other name')
    })
  })
  describe('UpdatePassword method', () => {
    let props: UserProps
    let entity: UserEntity

    beforeEach(() => {
      props = UserDataBuilder({})
      entity = new UserEntity(props)
    })
    it('Should a invalid user using password field', () => {
      expect(() => entity.updatePassword('')).toThrow(EntityValidationError)
      expect(() => entity.updatePassword(null)).toThrow(EntityValidationError)
      expect(() =>
        entity.updatePassword('a'.repeat(MAX_LENGTH_PASSWORD + 1)),
      ).toThrow(EntityValidationError)
      expect(() => entity.updatePassword(10 as any)).toThrow(
        EntityValidationError,
      )
    })
    it('Should a valid user', () => {
      expect.assertions(0)
      const props = {
        ...UserDataBuilder({}),
      }
      const entity = new UserEntity(props)
      entity.updatePassword('other password')
    })
  })
})

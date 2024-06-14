import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/reposotires/user-in-memory.repository'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data.builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { UpdatePasswordUseCase } from '../../update-password.usecase'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider'
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error'

describe('UpdatePasswordUseCase unit test', () => {
  let sut: UpdatePasswordUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new UpdatePasswordUseCase.UseCase(repository, hashProvider)
  })
  it('Should throws error when entity not found', async () => {
    await expect(
      sut.execute({
        id: 'fakeID',
        password: 'test password',
        oldPassword: 'test old password',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })
  it('Should throws error when old password not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    repository.items = [entity]
    await expect(
      sut.execute({
        id: entity.id,
        password: 'test password',
        oldPassword: '',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old Password and new password is required'),
    )
  })
  it('Should throws error when new password not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({ password: '1234' }))
    repository.items = [entity]
    await expect(
      sut.execute({
        id: entity.id,
        password: '',
        oldPassword: '1234',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old Password and new password is required'),
    )
  })
  it('Should throws error when old password does not match', async () => {
    const hashedPassword = await hashProvider.generateHash('1234')
    const entity = new UserEntity(UserDataBuilder({ password: hashedPassword }))
    repository.items = [entity]
    await expect(
      sut.execute({
        id: entity.id,
        password: '1234',
        oldPassword: '123456',
      }),
    ).rejects.toThrow(new InvalidPasswordError('Old Password does not match'))
  })
  it('Should update password', async () => {
    const password = '4567'
    const oldPassword = '1234'
    const hashedPassword = await hashProvider.generateHash(oldPassword)
    const items = [
      new UserEntity(UserDataBuilder({ password: hashedPassword })),
    ]
    const spyUpdate = jest.spyOn(repository, 'update')
    repository.items = items

    const result = await sut.execute({
      id: items[0]._id,
      password: password,
      oldPassword: oldPassword,
    })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    const checkNewPassword = await hashProvider.compareHash(
      password,
      result.password,
    )
    expect(checkNewPassword).toBeTruthy()
  })
})

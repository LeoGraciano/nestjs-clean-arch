import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/reposotires/user-in-memory.repository'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data.builder'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { SignInUseCase } from '../../sign-in.usecase'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

describe('SignUpUseCase unit test', () => {
  let sut: SignInUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new SignInUseCase.UseCase(repository, hashProvider)
  })
  it('Should authentication a user', async () => {
    const email = 'a@a.com'
    const password = '1234'
    const sypFindByEmail = jest.spyOn(repository, 'findByEmail')
    const hashedPassword = await hashProvider.generateHash(password)
    const entity = new UserEntity(
      UserDataBuilder({ email: email, password: hashedPassword }),
    )
    repository.items = [entity]
    const result = await sut.execute({
      email: email,
      password: password,
    })
    expect(sypFindByEmail).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(entity.toJSON())
  })
  it('Should throws error when email not provided', async () => {
    const props = { email: null, password: '123' }

    expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })
  it('Should throws error when password not provided', async () => {
    const props = { email: 'a@a.com', password: null }

    expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })
  it('Should not be able to authentication with wrong email', async () => {
    const props = { email: 'fake@email.com', password: '12345' }

    expect(() => sut.execute(props)).rejects.toBeInstanceOf(NotFoundError)
  })
  it('Should not be able to sign in with same email twice', async () => {
    const email = 'a@a.com'
    const password = '1234'
    const hashedPassword = await hashProvider.generateHash(password)
    const entity = new UserEntity(
      UserDataBuilder({ email: email, password: hashedPassword }),
    )
    repository.items = [entity]
    expect(() =>
      sut.execute({
        email: email,
        password: 'fake',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

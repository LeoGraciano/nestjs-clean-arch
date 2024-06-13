import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/reposotires/user-in-memory.repository'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data.builder'
import { GetUserUseCase } from '../../getuser.usecase'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'

describe('GetUserUseCase unit test', () => {
  let sut: GetUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new GetUserUseCase.UseCase(repository)
  })
  it('Should throws error when entity not found', async () => {
    await expect(sut.execute({ id: 'fakeID' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })
  it('Should be able to get user profile', async () => {
    const props = UserDataBuilder({})
    const items = [new UserEntity(props)]
    const spyFindById = jest.spyOn(repository, 'findById')
    repository.items = items

    const result = await sut.execute({ id: items[0]._id })
    expect(spyFindById).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({
      id: items[0].id,
      name: items[0].name,
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    })
  })
})

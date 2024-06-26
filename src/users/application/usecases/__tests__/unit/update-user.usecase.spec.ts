import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/reposotires/user-in-memory.repository'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data.builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UpdateUserUseCase } from '../../update-user.usecase'
import { BadRequestError } from '@/shared/application/errors/bad-request-error'

describe('GetUserUseCase unit test', () => {
  let sut: UpdateUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UpdateUserUseCase.UseCase(repository)
  })
  it('Should throws error when entity not found', async () => {
    await expect(
      sut.execute({ id: 'fakeID', name: 'test Name' }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })
  it('Should throws error when name not provided not found', async () => {
    await expect(sut.execute({ id: 'fakeID', name: '' })).rejects.toThrow(
      new BadRequestError('Name not provided'),
    )
  })
  it('Should be able to get user profile', async () => {
    const props = UserDataBuilder({})
    const items = [new UserEntity(props)]
    const spyUpdate = jest.spyOn(repository, 'update')
    repository.items = items

    const result = await sut.execute({ id: items[0]._id, name: 'new name' })
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({
      id: items[0].id,
      name: 'new name',
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    })
  })
})

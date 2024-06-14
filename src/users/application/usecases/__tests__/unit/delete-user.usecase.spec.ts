import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/reposotires/user-in-memory.repository'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data.builder'
import { GetUserUseCase } from '../../get-user.usecase'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { DeleteUserUseCase } from '../../delete-user.usecase'

describe('DeleteUserUseCase unit test', () => {
  let sut: DeleteUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new DeleteUserUseCase.UseCase(repository)
  })
  it('Should throws error when entity not found', async () => {
    await expect(sut.execute({ id: 'fakeID' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })
  it('Should delete user', async () => {
    const props = UserDataBuilder({})
    const items = [new UserEntity(props)]
    const spyDelete = jest.spyOn(repository, 'delete')
    repository.items = items

    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0]._id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })
})

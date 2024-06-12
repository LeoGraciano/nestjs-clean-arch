import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('StubInMemoryRepository', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'test 1', price: 50 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })
  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fake_id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })
  it('Should find a entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findById(entity.id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })
  it('Should return all entities', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })

  it('Should throw error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should update a entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const entityUpdated = new StubEntity(
      {
        name: 'test update name',
        price: 10,
      },
      entity._id,
    )
    await sut.update(entityUpdated)
    const result = await sut.findById(entity.id)
    expect(entityUpdated.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should throw error when entity not found', async () => {
    await expect(sut.delete('fake_id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })
  it('Should update a entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    await sut.delete(entity.id)
    expect(sut.items).toHaveLength(0)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
})

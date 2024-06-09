import { Entity } from '../domain/entities/entity'
import { NotFoundError } from '../domain/errors/not-fond-error'
import { RepositoryInterface } from './repository-contracts'

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = []
  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findById(id: string): Promise<E> {
    return this._get(id)
  }

  async findAll(): Promise<E[]> {
    throw this.items
  }

  async update(entity: E): Promise<void> {
    const index = await this._getIndex(entity.id)
    this.items[index] = entity
  }

  async delete(id: string): Promise<void> {
    const index = await this._getIndex(id)
    this.items.slice(index, 1)
  }

  protected async _get(id: string): Promise<E> {
    const _id = `${id}`
    const entity = this.items.find(item => {
      item.id === _id
    })
    if (!entity) {
      throw new NotFoundError('Entity not found')
    }
    return entity
  }
  protected async _getIndex(id: string): Promise<number> {
    await this._get(id)
    const index = this.items.findIndex(item => item.id === id)
    return index
  }
}

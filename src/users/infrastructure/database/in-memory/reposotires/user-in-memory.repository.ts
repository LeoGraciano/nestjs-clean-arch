import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { InMemorySearchableRepository } from '@/shared/repositories/in-memory-searchable.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepositoryInterface } from '@/users/domain/repositories/user.repository'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepositoryInterface
{
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`Entity not found ${email}`)
    }
    return entity
  }
  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError(`Email address in used ${email}`)
    }
  }
}

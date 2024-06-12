import { SearchableRepositoryInterface } from '@/shared/repositories/searchable-contracts'
import { UserEntity } from '../entities/user.entity'

export interface UserRepositoryInterface
  extends SearchableRepositoryInterface<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
}

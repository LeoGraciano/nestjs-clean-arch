import { SortDirection } from '@/shared/domain/repositories/searchable-repository'
import { ListUsersUseCase } from '@/users/application/usecases/lis-users.usecase'

export class ListUserDto implements ListUsersUseCase.Input {
  page?: number
  perPage?: number
  sort?: string
  sortDirection?: SortDirection
  filter?: string
}

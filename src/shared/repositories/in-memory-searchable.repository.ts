import { Entity } from '../domain/entities/entity'
import { InMemoryRepository } from './in-memory.repository'
import { SearchableRepositoryInterface } from './searchable-contracts'
import { SearchParams, SearchResult } from './searchable-repository'

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  async search(props: SearchParams): Promise<SearchResult<E>> {
    throw new Error('Method not implemented.')
  }
  protected abstract applyFilter(item: E[], filter: string | null): Promise<E[]>

  protected async applySort(
    item: E[],
    sort: string | null,
    sortDirection: string | null,
  ): Promise<E[]> {}

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<E[]> {}
}

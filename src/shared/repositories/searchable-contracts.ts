import { Entity } from '../domain/entities/entity'
import { RepositoryInterface } from './repository-contracts'
import { SearchParams, SearchResult } from './searchable-repository'

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  sortableFields: string[]
  search(props: SearchInput): Promise<SearchOutput>
}

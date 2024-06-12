import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository'
import { SearchParams, SearchResult } from '../../searchable-repository'
import { DEFAULT_LIMIT_PAGE } from '@/shared/domain/entities/rules/const-values'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name']
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) return items

    return items.filter(item =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }
}

describe('StubInMemoryRepository', () => {
  let sut: StubInMemorySearchableRepository

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository()
  })
  describe('applyFilter method', () => {
    it('Should not filter items when filters param is null', async () => {
      const items = [new StubEntity({ name: 'name value', price: 50 })]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const itemsFiltered = await sut['applyFilter'](items, null)
      expect(itemsFiltered).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })
    it('Should filter using a filter param', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'TEST', price: 90 }),
        new StubEntity({ name: 'fake', price: 150 }),
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      let itemsFiltered = await sut['applyFilter'](items, 'TEST')
      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)

      itemsFiltered = await sut['applyFilter'](items, 'Test')
      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(2)

      itemsFiltered = await sut['applyFilter'](items, 'no-filter')
      expect(itemsFiltered).toHaveLength(0)
      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
    })
  })
  describe('applySort method', () => {
    it('Should not sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 90 }),
      ]
      let itemsSort = await sut['applySort'](items, null, null)
      expect(itemsSort).toStrictEqual(items)

      itemsSort = await sut['applySort'](items, 'price', 'asc')
      expect(itemsSort).toStrictEqual(items)
    })
    it('Should sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 90 }),
        new StubEntity({ name: 'c', price: 90 }),
      ]
      let itemsSort = await sut['applySort'](items, 'name', 'asc')
      expect(itemsSort).toStrictEqual([items[1], items[0], items[2]])

      itemsSort = await sut['applySort'](items, 'name', 'desc')
      expect(itemsSort).toStrictEqual([items[2], items[0], items[1]])
    })
  })
  describe('applyPaginate method', () => {
    it('Should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'b', price: 90 }),
        new StubEntity({ name: 'c', price: 90 }),
        new StubEntity({ name: 'd', price: 90 }),
        new StubEntity({ name: 'e', price: 90 }),
      ]
      let itemsPaginated = await sut['applyPaginate'](items, 1, 2)
      expect(itemsPaginated).toStrictEqual([items[0], items[1]])

      itemsPaginated = await sut['applyPaginate'](items, 2, 2)
      expect(itemsPaginated).toStrictEqual([items[2], items[3]])

      itemsPaginated = await sut['applyPaginate'](items, 3, 2)
      expect(itemsPaginated).toStrictEqual([items[4]])

      itemsPaginated = await sut['applyPaginate'](items, 4, 2)
      expect(itemsPaginated).toStrictEqual([])
    })
  })
  describe('search method', () => {
    it('Should apply only pagination when the other param are null', async () => {
      const entity = new StubEntity({ name: 'test', price: 50 })
      const total = 16
      const items = Array(total).fill(entity)
      sut.items = items

      const params = await sut.search(new SearchParams())
      expect(params).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: total,
          currentPage: 1,
          perPage: DEFAULT_LIMIT_PAGE,
          sort: null,
          sortDirection: null,
          filter: null,
        }),
      )
    })
    it('Should apply pagination and filter', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'a', price: 90 }),
        new StubEntity({ name: 'TEST', price: 90 }),
        new StubEntity({ name: 'TeSt', price: 90 }),
      ]
      sut.items = items

      let params = await sut.search(
        new SearchParams({ page: 1, perPage: 2, filter: 'TEST' }),
      )

      let params_result = new SearchResult({
        items: [items[0], items[2]],
        total: 3,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDirection: null,
        filter: 'TEST',
      })
      expect(params).toStrictEqual(params_result)
      params = await sut.search(
        new SearchParams({ page: 2, perPage: 2, filter: 'TEST' }),
      )

      params_result = new SearchResult({
        items: [items[3]],
        total: 3,
        currentPage: 2,
        perPage: 2,
        sort: null,
        sortDirection: null,
        filter: 'TEST',
      })
      expect(params).toStrictEqual(params_result)
    })
    it('Should apply pagination and sort', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 90 }),
        new StubEntity({ name: 'd', price: 90 }),
        new StubEntity({ name: 'e', price: 90 }),
        new StubEntity({ name: 'c', price: 90 }),
      ]
      sut.items = items

      let params = await sut.search(
        new SearchParams({ page: 1, perPage: 2, sort: 'name' }),
      )
      let params_result = new SearchResult({
        items: [items[3], items[2]],
        total: 5,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDirection: 'desc',
        filter: null,
      })
      expect(params).toStrictEqual(params_result)

      params = await sut.search(
        new SearchParams({ page: 2, perPage: 2, sort: 'name' }),
      )

      params_result = new SearchResult({
        items: [items[4], items[0]],
        total: 5,
        currentPage: 2,
        perPage: 2,
        sort: 'name',
        sortDirection: 'desc',
        filter: null,
      })
      expect(params).toStrictEqual(params_result)

      params = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 2,
          sort: 'name',
          sortDirection: 'asc',
        }),
      )
      params_result = new SearchResult({
        items: [items[1], items[0]],
        total: 5,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDirection: 'asc',
        filter: null,
      })
      expect(params).toStrictEqual(params_result)

      params = await sut.search(
        new SearchParams({
          page: 3,
          perPage: 2,
          sort: 'name',
          sortDirection: 'asc',
        }),
      )
      params_result = new SearchResult({
        items: [items[3]],
        total: 5,
        currentPage: 3,
        perPage: 2,
        sort: 'name',
        sortDirection: 'asc',
        filter: null,
      })
      expect(params).toStrictEqual(params_result)
    })
    it('Should apply pagination and filter', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'a', price: 90 }),
        new StubEntity({ name: 'TEST', price: 90 }),
        new StubEntity({ name: 'e', price: 90 }),
        new StubEntity({ name: 'TeSt', price: 90 }),
      ]
      sut.items = items

      let params = await sut.search(
        new SearchParams({ page: 1, perPage: 2, filter: 'TEST', sort: 'name' }),
      )

      let params_result = new SearchResult({
        items: [items[0], items[4]],
        total: 3,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDirection: 'desc',
        filter: 'TEST',
      })
      expect(params).toStrictEqual(params_result)

      params = await sut.search(
        new SearchParams({ page: 2, perPage: 2, filter: 'TEST', sort: 'name' }),
      )
      params_result = new SearchResult({
        items: [items[2]],
        total: 3,
        currentPage: 2,
        perPage: 2,
        sort: 'name',
        sortDirection: 'desc',
        filter: 'TEST',
      })
      expect(params).toStrictEqual(params_result)
    })
  })
})

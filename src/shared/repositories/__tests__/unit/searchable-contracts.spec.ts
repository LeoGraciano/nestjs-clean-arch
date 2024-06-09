import { SearchParams } from '../../searchable-repository'

describe('Searchable contract unit tests', () => {
  it('page prop', () => {
    const sut = new SearchParams()
    expect(sut.page).toBe(1)
    const params = [
      { page: null as any, expected: 1 },
      { page: undefined as any, expected: 1 },
      { page: '' as any, expected: 1 },
      { page: 'test' as any, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5 as any, expected: 1 },
      { page: true as any, expected: 1 },
      { page: false as any, expected: 1 },
      { page: {} as any, expected: 1 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ]
    params.forEach(element => {
      expect(new SearchParams({ page: element.page }).page).toBe(
        element.expected,
      )
    })
  })
  it('perPage prop', () => {
    const sut = new SearchParams()
    expect(sut.perPage).toBe(15)
    const params = [
      { perPage: null as any, expected: 15 },
      { perPage: undefined as any, expected: 15 },
      { perPage: '' as any, expected: 15 },
      { perPage: 'test' as any, expected: 15 },
      { perPage: 0, expected: 15 },
      { perPage: -1, expected: 15 },
      { perPage: 5.5 as any, expected: 15 },
      { perPage: true as any, expected: 15 },
      { perPage: false as any, expected: 15 },
      { perPage: {} as any, expected: 15 },
      { perPage: 1, expected: 1 },
      { perPage: 2, expected: 2 },
    ]
    params.forEach(element => {
      expect(new SearchParams({ perPage: element.perPage }).perPage).toBe(
        element.expected,
      )
    })
  })
  it('sort prop', () => {
    const sut = new SearchParams()
    expect(sut.sort).toBeNull()

    const params = [
      { sort: null as any, expected: null },
      { sort: undefined as any, expected: null },
      { sort: '', expected: null },
      { sort: 'test', expected: 'test' },
      { sort: 0, expected: '0' },
      { sort: -1, expected: '-1' },
      { sort: 5.5 as any, expected: '5.5' },
      { sort: true as any, expected: 'true' },
      { sort: false as any, expected: 'false' },
      { sort: {} as any, expected: '[object Object]' },
      { sort: 1, expected: '1' },
      { sort: 2, expected: '2' },
      { sort: 25, expected: '25' },
    ]
    params.forEach(element => {
      expect(new SearchParams({ sort: element.sort }).sort).toBe(
        element.expected,
      )
    })
  })
  it('sortDirection prop', () => {
    let sut = new SearchParams()
    expect(sut.sortDirection).toBeNull()

    sut = new SearchParams({ sort: null })
    expect(sut.sortDirection).toBeNull()

    sut = new SearchParams({ sort: undefined })
    expect(sut.sortDirection).toBeNull()

    sut = new SearchParams({ sort: '' })
    expect(sut.sortDirection).toBeNull()

    const params = [
      { sortDirection: null as any, expected: 'desc' },
      { sortDirection: undefined as any, expected: 'desc' },
      { sortDirection: '', expected: 'desc' },
      { sortDirection: 'test', expected: 'desc' },
      { sortDirection: 0, expected: 'desc' },
      { sortDirection: true as any, expected: 'desc' },
      { sortDirection: false as any, expected: 'desc' },
      { sortDirection: {} as any, expected: 'desc' },
      { sortDirection: 'desc', expected: 'desc' },
      { sortDirection: 'DESC', expected: 'desc' },
      { sortDirection: 'asc', expected: 'asc' },
      { sortDirection: 'ASC', expected: 'asc' },
    ]
    params.forEach(element => {
      expect(
        new SearchParams({
          sort: 'field',
          sortDirection: element.sortDirection,
        }).sortDirection,
      ).toBe(element.expected)
    })
  })

  it('filter prop', () => {
    const sut = new SearchParams()
    expect(sut.filter).toBeNull()

    const params = [
      { filter: null as any, expected: null },
      { filter: undefined as any, expected: null },
      { filter: '', expected: null },
      { filter: 'test', expected: 'test' },
      { filter: 0, expected: '0' },
      { filter: -1, expected: '-1' },
      { filter: 5.5 as any, expected: '5.5' },
      { filter: true as any, expected: 'true' },
      { filter: false as any, expected: 'false' },
      { filter: {} as any, expected: '[object Object]' },
      { filter: 1, expected: '1' },
      { filter: 2, expected: '2' },
      { filter: 25, expected: '25' },
    ]
    params.forEach(element => {
      expect(new SearchParams({ filter: element.filter }).filter).toBe(
        element.expected,
      )
    })
  })
})

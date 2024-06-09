import { SearchParams } from '../../searchable-repository'

describe('Searchable contract unit tests', () => {
  it('page prop', () => {
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
    const params = [
      { perPage: null as any, expected: 15 },
      { perPage: undefined as any, expected: 15 },
      { perPage: '' as any, expected: 15 },
      { perPage: 'test' as any, expected: 15 },
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
})

import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}
describe('Entity unit test', () => {
  let props: StubProps
  let sut: StubEntity
  let id: string

  beforeEach(() => {
    id = 'd9158ae2-7775-4a85-b111-044b67362412'
    props = { prop1: 'value 1', prop2: 15 }
    sut = new StubEntity(props)
  })

  it('Should set props and id', () => {
    expect(sut.props).toStrictEqual(props)
    expect(sut._id).not.toBeNull()
    expect(uuidValidate(sut._id)).toBeTruthy()
  })
  it('Should accept a valid uuid', () => {
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })
  it('Should convert a entity to Javascript Object ', () => {
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({ id, ...props })
  })
})

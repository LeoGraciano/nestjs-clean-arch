import { BcryptjsHashProvider } from '../../bcryptjs-hash.provider'

describe('BcryptjsHashProvider', () => {
  let sut: BcryptjsHashProvider

  beforeEach(() => {
    sut = new BcryptjsHashProvider()
  })

  it('Should be defined', () => {
    expect(sut).toBeDefined()
  })
  it('Should return encrypted password', async () => {
    const password = 'TestePassword123'
    const hash = await sut.generateHash(password)
    expect(hash).toBeDefined()
  })

  it('Should generateHash a valid password', async () => {
    const validPassword = 'ValidP@ssw0rd'
    const hashedPassword = await sut.generateHash(validPassword)
    expect(hashedPassword).not.toBe(validPassword)
  })

  it('Should compare a valid password with its hash', async () => {
    const validPassword = 'ValidP@ssw0rd'
    const hashedPassword = await sut.generateHash(validPassword)
    const isMatch = await sut.compareHash(validPassword, hashedPassword)
    expect(isMatch).toBeTruthy()
  })

  it('Should compareHash an invalid password with its hash', async () => {
    const validPassword = 'ValidP@ssw0rd'
    const invalidPassword = 'invalid'
    const hashedPassword = await sut.generateHash(validPassword)
    const isMatch = await sut.compareHash(invalidPassword, hashedPassword)
    expect(isMatch).toBeFalsy()
  })
})

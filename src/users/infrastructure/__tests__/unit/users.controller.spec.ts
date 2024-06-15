import { UsersController } from '../../users.controller'
import { UserOutput } from '@/users/application/dtos/user-output'
import { SignUpUseCase } from '@/users/application/usecases/sign-up.usecase'
import { SignUpDto } from '../../dtos/sign-up-user.dto'
import { SignInUseCase } from '@/users/application/usecases/sign-in.usecase'
import { SignInDto } from '../../dtos/sign-in-user.dto'

describe('UsersController', () => {
  let sut: UsersController
  let id: string
  let props: UserOutput

  beforeEach(async () => {
    sut = new UsersController()
    id = 'aff23916-69a0-4126-9085-2df9d8c1e3a9'
    props = {
      id,
      name: 'name',
      email: 'email',
      password: '123',
      createdAt: new Date(),
    }
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
  it('should create a user', async () => {
    const output: SignUpUseCase.Output = props
    const mockSignUpUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['signUpUseCase'] = mockSignUpUseCase as any
    const input: SignUpDto = {
      name: 'name',
      email: 'email',
      password: '123',
    }

    const result = await sut.create(input)
    expect(output).toStrictEqual(result)
    expect(mockSignUpUseCase.execute).toHaveBeenCalledWith(input)
  })
  it('should authenticate a user', async () => {
    const output: SignInUseCase.Output = props
    const mockSignInUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['signInUseCase'] = mockSignInUseCase as any
    const input: SignInDto = {
      email: 'email',
      password: '123',
    }

    const result = await sut.login(input)
    expect(output).toStrictEqual(result)
    expect(mockSignInUseCase.execute).toHaveBeenCalledWith(input)
  })
})

import { UsersController } from '../../users.controller'
import { UserOutput } from '@/users/application/dtos/user-output'
import { SignUpUseCase } from '@/users/application/usecases/sign-up.usecase'
import { SignUpDto } from '../../dtos/sign-up-user.dto'
import { SignInUseCase } from '@/users/application/usecases/sign-in.usecase'
import { SignInDto } from '../../dtos/sign-in-user.dto'
import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase copy'
import { UpdateUserDto } from '../../dtos/update-user.dto'
import { UpdatePasswordUseCase } from '@/users/application/usecases/update-password.usecase'
import { UpdatePasswordDto } from '../../dtos/update-password.dto'
import { GetUserUseCase } from '@/users/application/usecases/get-user.usecase'
import { ListUsersUseCase } from '@/users/application/usecases/lis-users.usecase'
import { ListUserDto } from '../../dtos/list-user.dto'

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
  it('should update a user', async () => {
    const output: UpdateUserUseCase.Output = props
    const mockUpdateUserUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['updateUserUseCase'] = mockUpdateUserUseCase as any
    const input: UpdateUserDto = {
      name: 'name Teste',
    }

    const result = await sut.update(id, input)
    expect(output).toStrictEqual(result)
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({ id, ...input })
  })
  it('should update a user password', async () => {
    const output: UpdatePasswordUseCase.Output = props
    const mockUpdatePasswordUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['updatePasswordUseCase'] = mockUpdatePasswordUseCase as any
    const input: UpdatePasswordDto = {
      password: 'name Teste',
      oldPassword: 'password Teste',
    }

    const result = await sut.updatePassword(id, input)
    expect(output).toStrictEqual(result)
    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    })
  })
  it('should delete a user', async () => {
    const output = undefined
    const mockDeleteUserUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['deleteUserUseCase'] = mockDeleteUserUseCase as any

    const result = await sut.remove(id)
    expect(output).toStrictEqual(result)
    expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith({
      id,
    })
  })
  it('should find one user', async () => {
    const output: GetUserUseCase.Output = props
    const mockGetUserUserUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['getUserUseCase'] = mockGetUserUserUseCase as any

    const result = await sut.findOne(id)
    expect(output).toStrictEqual(result)
    expect(mockGetUserUserUseCase.execute).toHaveBeenCalledWith({
      id,
    })
  })
  it('should list users', async () => {
    const output: ListUsersUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    }
    const mockListUsersUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['listUsersUseCase'] = mockListUsersUseCase as any
    const searchParams = {
      page: 1,
      perPage: 1,
    }

    const result = await sut.search(searchParams)
    expect(output).toStrictEqual(result)
    expect(mockListUsersUseCase.execute).toHaveBeenCalledWith(searchParams)
  })
})

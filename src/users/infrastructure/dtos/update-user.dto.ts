import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase copy'

export class UpdateUserDto implements Omit<UpdateUserUseCase.Input, 'id'> {
  name: string
}

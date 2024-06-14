import { SignUpUseCase } from '@/users/application/usecases/sign-up.usecase'

export class SignUpDto implements SignUpUseCase.Input {
  email: string
  name: string
  password: string
}

import { SignInUseCase } from '@/users/application/usecases/sign-in.usecase'

export class SignUpDto implements SignInUseCase.Input {
  email: string
  password: string
}

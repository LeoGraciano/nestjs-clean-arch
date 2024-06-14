import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { SignUpUseCase } from '../application/usecases/sign-up.usecase'
import { UserInMemoryRepository } from './database/in-memory/reposotires/user-in-memory.repository'
import { BcryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserRepository } from '../domain/repositories/user.repository'

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    {
      provide: SignUpUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignUpUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
  ],
})
export class UsersModule {}

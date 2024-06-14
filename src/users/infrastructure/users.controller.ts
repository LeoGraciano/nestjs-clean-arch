import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common'

import { SignUpDto } from './dtos/sign-up-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { SignUpUseCase } from '../application/usecases/sign-up.usecase'
import { SignInUseCase } from '../application/usecases/sign-in.usecase'
import { UpdatePasswordUseCase } from '../application/usecases/update-password.usecase'
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase copy'
import { GetUserUseCase } from '../application/usecases/get-user.usecase'
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase'
import { ListUsersUseCase } from '../application/usecases/lis-users.usecase'
import { SignInDto } from './dtos/sign-in-user.dto'
import { ListUserDto } from './dtos/list-user.dto'
import { UpdatePasswordDto } from './dtos/update-password.dto'

@Controller('users')
export class UsersController {
  @Inject(SignUpUseCase.UseCase)
  private signUpUseCase: SignUpUseCase.UseCase

  @Inject(SignInUseCase.UseCase)
  private signInUseCase: SignInUseCase.UseCase

  @Inject(UpdateUserUseCase.UseCase)
  private updateUserUseCase: UpdateUserUseCase.UseCase

  @Inject(UpdatePasswordUseCase.UseCase)
  private updatePasswordUseCase: UpdatePasswordUseCase.UseCase

  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase

  @Inject(DeleteUserUseCase.UseCase)
  private deleteUserUseCase: DeleteUserUseCase.UseCase

  @Inject(ListUsersUseCase.UseCase)
  private listUsersUseCase: ListUsersUseCase.UseCase

  @Post()
  async create(@Body() signUpDto: SignUpDto) {
    return await this.signUpUseCase.execute(signUpDto)
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return await this.signInUseCase.execute(signInDto)
  }
  @Get()
  async search(@Query() searchParams: ListUserDto) {
    return await this.listUsersUseCase.execute(searchParams)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.getUserUseCase.execute({ id })
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserUseCase.execute({ id, ...updateUserDto })
  }
  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.updatePasswordUseCase.execute({
      id,
      ...updatePasswordDto,
    })
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id })
  }
}

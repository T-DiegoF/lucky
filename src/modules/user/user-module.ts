import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { UserRepository } from './user-repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  providers: [UserRepository],
  controllers: [],
})
export class UserModule {}
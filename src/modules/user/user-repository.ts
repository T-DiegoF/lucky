import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DataSource } from 'typeorm';
import { Logger } from 'winston';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) { }

  async findUsername(username: any): Promise<User> {
    try {
      this.logger.info('searching user by username', { repository: UserRepository.name });
      const [result] = await this.dataSource.query(
        'SELECT * FROM `User` WHERE `username` = ?',
        [`${username}`],
      );

      return result;
    } catch (err) {
      this.logger.error('Error findUsername():', err.message, UserRepository.name);
      throw new Error(err.stack);
    }
  }

  async findUser(id: any) {
    try {
      this.logger.info('searching user by req.user.id', { repository: UserRepository.name });
      const [row] = await this.dataSource.query(
        'SELECT * FROM `user` INNER JOIN `profile` ON `user`.`id` = ?' +
        'INNER JOIN `address` ON `profile`.`addressId` = `address`.`id`' +
        'INNER JOIN `city` ON `address`.`id` = `city`.`id`' +
        'INNER JOIN `country` ON `city`.`countryId` = `country`.`id`',
        [`${id}`],
      );

      return row;
    } catch (err) {
      this.logger.error('Error findUser():', err.message, UserRepository.name);
      throw new Error(err.stack);
    }
  }
}

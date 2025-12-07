import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/userEntity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly loginRepository: Repository<UserEntity>,
    private readonly enityManager: EntityManager
  ) { }

  /*
  * @description Create a new user
  */
  async create(createUserDto: CreateUserDto) {
    try {
      await this.enityManager.transaction(async (transactionalEntityManager) => {
        const login = this.loginRepository.create(createUserDto);
        await transactionalEntityManager.save(login);
        return login;
      });
    } catch (error) {
      throw new BadRequestException('Failed to create user', error.message);
    }
  }

  async findByEmail(email: string) {
    console.log('Finding user by email:', email);
    return this.loginRepository.findOne({ where: { email } });
  } 

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

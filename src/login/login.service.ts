import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { EntityManager, Repository } from 'typeorm';
import { LoginEntity } from 'src/shared/entities/loginEntity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
    private readonly enityManager: EntityManager
  ) { }

  async create(createLoginDto: CreateLoginDto) {
    try {
      await this.enityManager.transaction(async (transactionalEntityManager) => {
        const login = this.loginRepository.create(createLoginDto);
        await transactionalEntityManager.save(login);
        return login;
      });
    } catch (error) {
      throw new BadRequestException('Failed to create login', error.message);
    }
  }

  async findAll() {
    this.enityManager.find(LoginEntity);

    return this.loginRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}

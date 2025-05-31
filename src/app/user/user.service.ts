import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { PasswordConfService } from './password.conf.service';
import { CreateUserDto } from './dto/createUsert.dto';
import { User } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { generateID } from 'src/utils/generateID';
import { ERole } from 'src/types/enum/ERole.enum';
import { Transactional } from 'typeorm-transactional';
import { UpdateUserDto } from './dto/updateUsert.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly messageService: MessageService,
    private readonly passwordService: PasswordConfService,
  ) {}

  @Transactional()
  public async createUser(
    createUserDto: CreateUserDto,
    isAdmin?: boolean,
  ): Promise<User> {
    const lastData: User[] = await this.userRepository.find({
      take: 1,
      order: { id: 'DESC' },
    });

    const lastID: string | null = lastData[0]?.id ?? null;
    const id: string = generateID('U', lastID);

    const password: string = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const user: User = await this.userRepository.save({
      id,
      email: createUserDto.email,
      name: createUserDto.name,
      phoneNumber: createUserDto.phoneNumber,
      password,
      address: createUserDto.address,
      gender: createUserDto.gender,
      role: isAdmin ? ERole.ADMIN : ERole.USER,
    });

    if (!user) throw new BadRequestException('Failed to create user');

    const serializedUser: User = plainToInstance(User, user);

    this.messageService.setMessage('User created successfully');
    return serializedUser;
  }

  public findAllUser(): Promise<User[]> {
    this.messageService.setMessage('Get all user successfully');
    return this.userRepository.find({
      select: [
        'id',
        'name',
        'email',
        'phoneNumber',
        'address',
        'gender',
        'role',
      ],
      order: { createdAt: 'ASC' },
    });
  }

  public async findOneUser(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    this.messageService.setMessage('Get user successfully');
    return user;
  }

  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user: User = await this.findOneUser(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existing = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException('Email already in use');
      }
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.phoneNumber = updateUserDto.phoneNumber;
    user.address = updateUserDto.address;

    const updatedUser: User = await this.userRepository.save(user);

    if (!updatedUser) throw new BadRequestException('Failed to update user');

    this.messageService.setMessage('User updated successfully');
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<void> {
    const deletedUser: DeleteResult = await this.userRepository.delete({ id });

    if (!deletedUser.affected) throw new NotFoundException('User not found');

    this.messageService.setMessage('User deleted successfully');
  }
}

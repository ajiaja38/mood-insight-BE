import { MessageService } from '../message/message.service';
import { PasswordConfService } from './password.conf.service';
import { CreateUserDto } from './dto/createUsert.dto';
import { User } from './model/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUsert.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly messageService;
    private readonly passwordService;
    constructor(userRepository: Repository<User>, messageService: MessageService, passwordService: PasswordConfService);
    createUser(createUserDto: CreateUserDto, isAdmin?: boolean): Promise<User>;
    findAllUser(): Promise<User[]>;
    findOneUser(id: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
}

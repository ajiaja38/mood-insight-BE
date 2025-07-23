import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUsert.dto';
import { User } from './model/user.entity';
import { IJwtPayload } from '../../types/interface/IJwtPayload.interface';
import { UpdateUserDto } from './dto/updateUsert.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    protected registerUserHandler(createUserDto: CreateUserDto): Promise<User>;
    protected registerAdminHandler(createUserDto: CreateUserDto): Promise<User>;
    protected getAllUserHandler(): Promise<User[]>;
    protected getUserByIDHandler(id: string): Promise<User>;
    protected getUserProfileHandler(user: IJwtPayload): Promise<User>;
    protected updateUserHandler(user: IJwtPayload, updateUserDto: UpdateUserDto): Promise<User>;
    protected deleteUserHandler(id: string): Promise<void>;
}

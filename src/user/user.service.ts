import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { MongoRepository } from "typeorm";
import { RegitserUserDto } from "./dto/register.user.dto";
import { hashPassword } from "src/standards/functions";
import { UpdateuserDto } from "./dto/update.user.dto";
import { LoggedInUser } from "src/auth/decorators";
import { IUserService } from "./interfaces/i.user.service";

/**
 * Service class that has the repository injected in it for effective communication with the database.
 */
@Injectable()
export class UserService implements IUserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User> 
    ){}

    async getAUserByEmail({email}:{email: string}): Promise<User>{
        const user = await this.userRepository.findOne({
            where:{
                email
            },
            select:{
                uuid: true,
                email:true,
                password: true
            }
        });
        return user;
    }

    async registerUser(dto: RegitserUserDto): Promise<User>{
        const emailExists = await this.userRepository.findOne({
            where:{
                email: dto.email
            }
        });
        if(emailExists) throw new BadRequestException('Email already exists.');
        const user = new User();
        user.email = dto.email.toLowerCase();
        user.first_name = dto.first_name;
        user.last_name = dto.last_name;
        //Hash the password
        user.password = await hashPassword(dto.password);
        const savedUser = await this.userRepository.save(user);
        delete savedUser.password;
        return savedUser;
    }

    async getWelcomeMessage(authUser: LoggedInUser):Promise<{message: string}>{
        const user = await this.userRepository.findOne({
            where:{
                uuid: authUser.id
            }
        })
        if(!user) throw new BadRequestException('User not found!');
        return {
            message: `Welcome to your dashboard, ${user.first_name}`
        };

    }
    async updateUser({dto, authUser}:{dto: UpdateuserDto, authUser: LoggedInUser}): Promise<User>{
        const user = await this.userRepository.findOne({
            where:{
                uuid: authUser.id
            }
        });
        if(!user) throw new BadRequestException('User not found!');
        if(dto.last_name) user.last_name = dto.last_name;
        if(dto.first_name) user.first_name = dto.first_name;
        const savedUser = await this.userRepository.save(user);
        if(savedUser.password) delete savedUser.password;
        return savedUser;
    }

}
import { LoggedInUser } from "src/auth/decorators";
import { RegitserUserDto } from "../dto/register.user.dto";
import { User } from "../entities/user.entity";
import { UpdateuserDto } from "../dto/update.user.dto";
/**
 * The interface for user service
 * 
 */
export interface IUserService{
    getAUserByEmail({email}:{email: string}):  Promise<User>;
    registerUser(dto: RegitserUserDto): Promise<User>;
    getWelcomeMessage(authUser: LoggedInUser):Promise<{message: string}>
    updateUser({dto, authUser}:{dto: UpdateuserDto, authUser: LoggedInUser}): Promise<User>
}
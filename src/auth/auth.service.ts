import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async authenticateUser(email: string, password: string){
        const user = await this.userService.getAUserByEmail({email});
        if(!user) throw new BadRequestException("Invalid email.");
        if(!user.password) throw new BadRequestException("User has not set password.");
        const passCorrect = await bcrypt.compare(password, user.password);
        if (user && passCorrect) {
            const { password, ...result } = user;
            return result;
        }
        throw new BadRequestException("Invalid password.");
    }

    async loginUser(req: any){
        console.log({USER: req.user})
        if(!req.user) throw new BadRequestException("User not found");
        const user = req.user;
        if(!user.email) throw new BadRequestException("Email not found.");
        let payload = {
            id: user.uuid,
            email: user.email
        }
        const token = await this.signPayload(payload);
        return {
            token
        }

    }

    async signPayload(payload: any): Promise<string>{
        try {
          const token =
          await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET,
        });
        return token;
        } catch(error){
          throw new InternalServerErrorException('Internal server exception!');
        }
      }
}
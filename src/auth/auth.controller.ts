import { Controller, Request, Post, HttpCode, HttpStatus, UseGuards, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { exception, response } from "src/standards/functions";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags("auth")
export class AuthConroller{
    constructor(private readonly authService: AuthService){}

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'example@gmail.com',
                    description: 'The email of the user'
                },
                password: {
                    type: 'string',
                    example: 'Password335d.',
                    description: "The password of the user. It should be a strong password."
                }
            }
        }
    })
    @ApiResponse({
        schema: {
            type: 'object',
            properties: {
                messages:{
                    example: "Successful"
                },
                code:{
                    example: HttpStatus.OK,
                },
                data: {
                    example: {
                        "token": "eyJhbGciOiJIUSZ3a4gegehejhhjeiie"
                    }
                }
            }
        }
    })
    async loginUser(@Request() req: any){
        try {
            const data = await this.authService.loginUser(req);
            return response({
                message: "Signed in successfully",
                data
            });
        }catch(e){
            exception(e);
        }
    }
}
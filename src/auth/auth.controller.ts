import { Controller, Request, Post, HttpCode, HttpStatus, UseGuards, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { exception, response } from "src/standards/functions";
import { ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthConroller{
    constructor(private readonly authService: AuthService){}

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
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
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5NzU5OGIxLWExZjMtNDUyNy05Y2ZlLTFkYmU4ZmU3ZWIyMCIsImVtYWlsIjoia29rb0BtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTY5MjgxNjk3MiwiZXhwIjoxNjkyODE3OTcyfQ.hG5KS6D0DdFXDF_AZwzLwzJjkaRqd5bQHT9a0wSZ3a4"
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
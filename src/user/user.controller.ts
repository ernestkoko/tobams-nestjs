import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { exception, response } from "src/standards/functions";
import { RegitserUserDto } from "./dto/register.user.dto";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { AuthUser, LoggedInUser } from "src/auth/decorators";
import { UpdateuserDto } from "./dto/update.user.dto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
/**
 * Controller that handles users endpoints
 */
@Controller('users')
@ApiTags("users")
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        schema: {
            type: 'object',
            properties: {
                messages:{
                    example: "Successful"
                },
                code:{
                    example: HttpStatus.CREATED,
                },
                data: {
                    example: {
                        "email": "koko1@mailinator.com",
                        "first_name": "Ernest",
                        "last_name": "Efe",
                        "uuid": "71937d25-d284-4f80-b1a2-689f2fd5ad3e",
                        "id": "64e64d2d43653ee9baaa74d7"
                    }
                }
            }
        }
    })
    async registerUser(@Body() dto: RegitserUserDto){
        try {
            const data = await this.userService.registerUser(dto);
            return response({
                data,
                code: HttpStatus.CREATED
            });
        }catch(e){
            exception(e);
        }
    }

    @Get("dashboard")
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
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
                        message: "Welcome to your dashboard, Ernest"
                    }
                }
            }
        }
    })
    async getWelcomeMessage(@AuthUser() authUser: LoggedInUser){
        try {
            const data = await this.userService.getWelcomeMessage(authUser);
            return response({data});
        }catch(e){
            exception(e);
        }
        
    }

    @Patch()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
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
                        message: "Welcome to your dashboard, Ernest"
                    }
                }
            }
        }
    })
    async updateUser(@Body() dto: UpdateuserDto, @AuthUser() authUser: LoggedInUser){
        try{
            const data = await this.userService.updateUser({dto, authUser});
            return response({data});
        }catch(e){
            exception(e);
        }
    }

}
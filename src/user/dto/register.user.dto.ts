import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
export class RegitserUserDto{
    @ApiProperty({
        description: 'The email address of a new user',
        example: "example@yahoo.com",
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of a new user',
        example: "Password233",
        required: true,
    })
    @IsStrongPassword()
    password: string;

    @ApiProperty({
        description: 'The first name of a new user',
        example: "Ernest",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        description: 'The last name of a new user',
        example: "Eferetin",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;
}
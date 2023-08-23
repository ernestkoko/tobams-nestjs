import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateuserDto{

    @ApiProperty({
        description: 'The first name a user wants to update to',
        example: "Erny",
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        description: 'The last name of a user wants to update to',
        example: "Efe",
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;
}
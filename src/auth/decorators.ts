import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const AuthUser = createParamDecorator((data: any, ctx: ExecutionContext) =>{
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});

export interface LoggedInUser{
    id: string;
    email: string;
}
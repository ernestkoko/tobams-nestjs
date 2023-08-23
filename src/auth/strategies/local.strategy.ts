import { Injectable, HttpException, HttpStatus, BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
    ) {
    super({
      userNameField: 'email'
    });
  }

  async validate(email: string, password: string) {
    try {
        const user = await this.authService.authenticateUser(email, password);
        return user;
    }catch(e){
        throw new HttpException(e.message, e.status);
    }
  }
}


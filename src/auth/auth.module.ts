import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthConroller } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[
        PassportModule,
        JwtModule.registerAsync({
          useFactory: async () => {
            return {
              secret: process.env.JWT_SECRET,
              signOptions: {
                expiresIn: process.env.JWT_EXPIRATION_TIME,
              },
            };
          }, 
        }),
        UserModule
    ],
    controllers: [AuthConroller],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    exports: [AuthService]
})
export class AuthModule{}
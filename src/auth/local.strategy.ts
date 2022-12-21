import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super()     //config
    }

    async validate(email: string, password: string) : Promise<User> {

        const user = await this.authService.validateUser(email, password)
        console.log("From Validate", user);
        
        if(!user) throw new UnauthorizedException();
        
        return user;
    }
}
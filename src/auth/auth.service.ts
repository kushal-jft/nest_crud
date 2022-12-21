import { Injectable } from '@nestjs/common';
import { User } from 'src/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService){}

  async validateUser(email: string, password: string): Promise<User> | undefined {
    const user = await this.userService.findOneByEmail(email);
    
    if(user && user.password === password){
        // const {password, email, ...rest} = user;
        console.log(user);
        return user;
    }
    return null;
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(userEmail: string, userPassword: string): Promise<any>{
        const user = await this.userService.getByEmail(userEmail);

        if(user && user.password === userPassword){
            const {_id, fullname, email} = user;
            return {id: _id, fullname, email};
        }

        return null;

    }


    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}

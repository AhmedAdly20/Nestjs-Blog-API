import { User } from './../users/models/user.interface';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }


    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password,12));
    }

    comparePassword(newPassword: string, hashedPassword: string): Observable<any | boolean>{
        return of<any | boolean>(bcrypt.compare(newPassword, hashedPassword));
    }
}

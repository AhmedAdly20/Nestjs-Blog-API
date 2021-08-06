import { User } from './models/user.interface';
import { UserEntity } from './models/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepositry: Repository<UserEntity>,
    ) {}


    findOne(id: number): Observable<User> {
        return from(this.userRepositry.findOne(id));
    }

    create(user: User): Observable<User> {
        return from(this.userRepositry.save(user));
    }


    findAll(): Observable<User[]> {
        return from(this.userRepositry.find());
    }


    updateOne(id: number, user: User): Observable<any> {
        return from(this.userRepositry.update(id, user));
    }

    
    deleteOne(id: number): Observable<any> {
        return from(this.userRepositry.delete(id));
    }

}

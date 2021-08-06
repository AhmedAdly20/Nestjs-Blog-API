import { User } from './models/user.interface';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    create(@Body() user: User): Observable<User> {
        return this.userService.create(user);
    }

    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id)
    }

    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) : Observable<any> {
        return this.userService.deleteOne(Number(id));
    }
}

import { RolesGuard } from './../auth/guards/roles.guard';
import { User, UserRole } from './models/user.interface';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { hasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
    Pagination,
} from 'nestjs-typeorm-paginate';
import { Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );;
    }


    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt }
            })
        );
    }


    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id)
    }


    @Get()
    index( @Query('page') page: number = 1, @Query('limit') limit: number = 10,): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;

        return this.userService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users'});
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) : Observable<any> {
        return this.userService.deleteOne(Number(id));
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
}

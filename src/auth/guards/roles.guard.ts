import { User } from './../../users/models/user.interface';
import { UsersService } from './../../users/users.service';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector, 
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if(!roles) {
            return true
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user.user;

        return this.userService.findOne(user.id).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;

                if (hasRole()) {
                    hasPermission = true;
                };
                return user && hasPermission;
            })
        )
    }
}
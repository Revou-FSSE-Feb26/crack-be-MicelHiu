import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository, private readonly jwt: JwtService
    ) {}

    async getUserById(id: string) {
        const user = await this.usersRepository.getUserById(id);
        if(!user) throw new NotFoundException("User Not Found");
        return user;
    }
}

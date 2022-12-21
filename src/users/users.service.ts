import { Injectable } from '@nestjs/common';
import { Person } from 'src/interfaces/person.interface';
// import { personData } from 'src/person.data';
import { UpdatePersonDTO } from '../dto/update_person.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { CreatePersonDTO } from 'src/dto/create_person.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}



    findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneByOrFail({id})
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneByOrFail({email})
    }

    async addOne(newUser: CreatePersonDTO): Promise<User> {
        return await this.usersRepository.save(newUser)
    }

    async updateOne(id: number, updUser: UpdatePersonDTO): Promise<User> {
        const user  = await this.findOne(id);
        user.name = updUser.name ? updUser.name : user.name
        user.email = updUser.email ? updUser.email : user.email
        user.password = updUser.password ? updUser.password : user.password

        return await this.usersRepository.save(user)
    }

    async deleteOne(id: number) : Promise<User> {
        const user = await this.findOne(id)
        return this.usersRepository.remove(user)
    }

}

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body
} from '@nestjs/common';
import { Person } from 'src/interfaces/person.interface';
import { UsersService } from './users.service';
import { CreatePersonDTO } from '../dto/create_person.dto';
import { UpdatePersonDTO } from '../dto/update_person.dto';
import { User } from 'src/user.entity';


@Controller('user')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get('get_all_users')
    async dgsdgsdgs(): Promise<User[]> {
        return await this.userService.findAll()
    }

    @Get('get_user/:id')
    findOne(@Param('id') id): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post('add_user')
    async addOne(@Body() newUserData: CreatePersonDTO): Promise<User> {
        newUserData.isAdmin = false
        return await this.userService.addOne(newUserData)
    }

    @Put('update_user/:id')
    updateOne(@Param('id')id: number, @Body() updUserData: UpdatePersonDTO): Promise<User> {
        return this.userService.updateOne(id, updUserData)
    }

    @Delete('delete_user/:id')
    deleteOne(@Param('id') id: number): Promise<User> {
        return this.userService.deleteOne(id);
    }
}

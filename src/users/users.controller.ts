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


@Controller('user')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get('get_all_users')
    findAll(): Person[] {
        // return userData;
        return this.userService.findAll();
    }

    @Get('get_user/:id')
    findOne(@Param('id') id): Person {
        return this.userService.findOne(id);
    }

    @Post('add_user')
    addOne(@Body() newUserData: CreatePersonDTO): Person {
        return this.userService.addOne({
            name: newUserData.name,
            email: newUserData.email,
            password: newUserData.password
            // isAdmin: newUserData.isAdmin
        })
    }

    @Put('update_user/:id')
    updateOne(@Param('id')id: string, @Body() updUserData: UpdatePersonDTO): Person | string {
        return this.userService.updateOne(id, updUserData)
    }

    @Delete('delete_user/:id')
    deleteOne(@Param('id') id: string): string {
        return this.userService.deleteOne(id);
    }
}

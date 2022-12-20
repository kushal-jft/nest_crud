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
import { AdminService } from './admin.service';
import { CreatePersonDTO } from '../dto/create_person.dto';
import { UpdatePersonDTO } from '../dto/update_person.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminservice: AdminService){}

    @Get('get_all_admins')
    findAll(): Person[] {
        // return userData;
        return this.adminservice.findAll();
    }

    @Get('get_admin/:id')
    findOne(@Param('id') id): Person {
        return this.adminservice.findOne(id);
    }

    @Post('add_admin')
    addOne(@Body() newUserData: CreatePersonDTO): Person {
        return this.adminservice.addOne({
            name: newUserData.name,
            email: newUserData.email,
            password: newUserData.password,
            // isAdmin: newUserData.isAdmin
        })
    }

    @Put('update_admin/:id')
    updateOne(@Param('id')id: string, @Body() updUserData: UpdatePersonDTO): Person | string {
        return this.adminservice.updateOne(id, updUserData)
    }

    @Delete('delete_admin/:id')
    deleteOne(@Param('id') id: string): string {
        return this.adminservice.deleteOne(id);
    }


}

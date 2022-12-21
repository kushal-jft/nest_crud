import { Injectable } from '@nestjs/common';
import { personData } from 'src/person.data';
import { Person } from 'src/interfaces/person.interface';
import { UpdatePersonDTO } from '../dto/update_person.dto';
import {v4 as uuid} from 'uuid';
// import { User } from 'src/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    // constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

    findAll(): Person[] {
        return personData.filter(person => person.isAdmin === true);
    }

    findOne(id: string): Person {
        return personData.find(person => person.id === id)
    }

    addOne(newAdmin: Person): Person {
        newAdmin.id = uuid()
        newAdmin.isAdmin = true
        personData.push(newAdmin);
        return personData[personData.length-1]
    }

    updateOne(id: string, updUserDTO: UpdatePersonDTO): Person | string {
        // console.log("Zeroth User: ", personData[0]);
        
        const idx: number = personData.findIndex((person: Person) => person.id === id);
        if(idx === -1){
            return "Invalid ID"
        }
        if(!personData[idx].isAdmin){
            return "Person is not an Admin"
        }
        const obj: Person = {
            name: updUserDTO.name ? updUserDTO.name : personData[idx].name,
            email: updUserDTO.email ? updUserDTO.email : personData[idx].email,
            password: updUserDTO.password ? updUserDTO.password : personData[idx].password,
            // isAdmin: updUserDTO.isAdmin ? updUserDTO.isAdmin : personData[idx].isAdmin,

        }
        
        personData[idx] = {id, ...obj}
        return personData[idx];
    }

    deleteOne(id: string) : string {
        const idx: number = personData.findIndex(person => person.id === id);
        personData.splice(idx, 1);
        return "Deletion Successful"
    }
}

import { Body, Injectable, Param } from '@nestjs/common';
import { Posts } from './posts.entity';
import { join } from 'path';
import { readFileSync } from 'fs';
import { CreateData } from './dto/create-post.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class PostsService {
    private readonly posts: Posts[] = JSON.parse(JSON.stringify(readFileSync(join(process.cwd(), 'src', 'store', 'posts.ts'), 'utf-8')))
    constructor(private jwtService: JwtService){}

    findAll(): Posts[] {
        return this.posts;
    }

    findOne(id: number): Posts {
        return this.posts.find(post => post.id === id);
    }

    findDelete(id: number): Posts[] {
        return this.posts.filter(post => post.id !== id);
    }

    Add(@Body() createData: CreateData): Posts[] {
        createData.id = (this.posts.length == 0 ? 1 : this.posts[this.posts.length - 1].id + 1)
        this.posts.push(createData);
        return this.posts;
    }

    Update(id: number, @Body() CreateData: CreateData): Posts[] {

        const obj1 = this.posts.find(post => post.id === id)

        obj1.name = CreateData.name
        obj1.job = CreateData.job
        obj1.salary = CreateData.salary
        obj1.Admin = CreateData.Admin

        return this.posts;

    }

    jwt(name: string) {
        const payload = { name }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}

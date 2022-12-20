import { Body, Controller, Delete, Get, Post, Param, Put } from '@nestjs/common';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { CreateData } from './dto/create-post.dto';

@Controller('/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll(): Posts[] {
        return this.postsService.findAll()

    }

    @Delete(':id')
    findDelete(@Param('id') id: string): Posts[] {
        return this.postsService.findDelete(+id)
    }

    @Post()
    Add(@Body() createData: CreateData): Posts[] {
        return this.postsService.Add(createData);
    }

    @Put(':id')
    Update(@Param('id') id: string, @Body() updateData: CreateData): Posts[] {
        return this.postsService.Update(+id, updateData)
    }

    @Post('/jwt')
    jwt(@Body('name') name: string) {
        return this.postsService.jwt(name);
    }



}

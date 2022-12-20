import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [JwtModule.register({ secret: "key" })],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule { }

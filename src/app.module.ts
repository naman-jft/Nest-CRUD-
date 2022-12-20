import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { JwtModule } from '@nestjs/jwt'
import { LoggerMiddleware } from './logger.middleware';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule,JwtModule.register({secret:"key"})],
  controllers: [AppController],
  providers: [AppService ],
})

export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .exclude(
        {path: 'posts/jwt', method: RequestMethod.POST}
      )
      .forRoutes(PostsController);
  }
 }

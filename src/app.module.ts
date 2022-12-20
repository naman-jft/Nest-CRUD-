import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataController } from './data/data.controller';
import { DataService } from './data/data.interface';
import { DataModule } from './data/data.module';
import { PostsModule } from './posts/posts.module';
import { JwtModule } from '@nestjs/jwt'




@Module({
  imports: [DataModule, PostsModule,JwtModule.register({secret:"key"})],
  controllers: [AppController, DataController],
  providers: [AppService, DataService],
})

export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply()
      .forRoutes();
  }
 }

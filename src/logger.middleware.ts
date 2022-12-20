import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService){}
  use(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization

    this.jwtService.verify(token)
    next();
  }
}
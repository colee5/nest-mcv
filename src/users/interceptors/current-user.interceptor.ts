import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  // context - Object which containst the info about the request/execution
  // next - A CallHandler interface that wraps the route handler that will be called
  // The return type Observable<any> | Promise<Observable<any>> indicates this method
  // can return either: An Observable directly A Promise that resolves to an Observable
  // Observable<any>: This is a stream of data that can emit multiple values over time.

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}

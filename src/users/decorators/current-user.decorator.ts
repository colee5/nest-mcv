import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// We cannot access dependency injection to fetch the user from the database
// So we make use of a interceptor:

// The interceptor runs before the Decorator, it injects currentUser
// Object into the request ,and then we can use it in the decorator - trick

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);

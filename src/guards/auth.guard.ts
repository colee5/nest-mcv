import { CanActivate, ExecutionContext } from '@nestjs/common';

// CanActivate to make sure we implement everything needed for a guard

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}

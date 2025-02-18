import { CanActivate, ExecutionContext } from '@nestjs/common';

// CanActivate to make sure we implement everything needed for a guard

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.currentUser;

    if (!currentUser) {
      return false;
    }

    return currentUser.admin;
  }
}

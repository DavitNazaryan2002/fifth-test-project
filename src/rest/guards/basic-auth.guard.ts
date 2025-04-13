import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../core/auth/service/auth.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );
    const [email, password] = credentials.split(':');

    if (!email || !password) {
      throw new UnauthorizedException('Invalid Basic Auth credentials');
    }

    // Validate using AuthService
    // Attach user to request
    (request as any).user = await this.authService.logIn(email, password);

    return true;
  }
}

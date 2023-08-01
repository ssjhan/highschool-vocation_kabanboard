import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Guard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

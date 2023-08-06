/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from './jwt-payload.interface';
import { EntityManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly entityManager: EntityManager) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mySecrect76',
    });
  }

  // This method must exists for every Strategy
  async validate(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this.entityManager.findOneBy(User, {
      username: username,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

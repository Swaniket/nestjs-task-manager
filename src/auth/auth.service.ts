import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async validateUserPassword(
    authCredentailsDto: AuthCredentialsDTO,
  ): Promise<string> {
    const { username, password } = authCredentailsDto;
    const user = await this.entityManager.findOneBy(User, {
      username: username,
    });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async signUp(authCredentailsDto: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentailsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await this.entityManager.save(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentailsDto: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const username = await this.validateUserPassword(authCredentailsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid Credentails');
    }

    const payload: IJwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(createAuthDto: CreateAuthDto) {
    try {
      const hashedPassword = await bcrypt.hash(createAuthDto.user_password, 10);
      const createdUser = await this.usersService.create({
        password: hashedPassword,
        username: createAuthDto.user_name,
      });
      const payload = { sub: createdUser.id, username: createdUser.username };
      return {
        user_id: createdUser.id,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.usersService.findOneByUsername(
        createAuthDto.user_name,
      );

      const isMatch = await bcrypt.compare(
        createAuthDto.user_password,
        user.password,
      );

      if (!isMatch)
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );

      const payload = { sub: user.id, username: user.username };
      return {
        user_id: user.id,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

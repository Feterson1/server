import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User]),JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configSerivice: ConfigService) => ({
      secret: configSerivice.get('JWT_SECRET'),
      signOptions: {expiresIn: '1d'},
    }),
    inject: [ConfigService],
  })],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],
})
export class UserModule {}

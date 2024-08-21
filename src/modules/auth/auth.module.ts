import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordService } from 'src/tools/password.service';
import { Person } from './person.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Person]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async(cfg: ConfigService) => ({
                secret: cfg.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: cfg.get<string>('JWT_EXPIRATION')
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PasswordService]
})
export class AuthModule {}

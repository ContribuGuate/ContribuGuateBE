import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { HealthModule } from './modules/health/health.module';
import { PasswordService } from './tools/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/auth/user.entity';
import { Organization } from './modules/organization/organization.entity';
import { CommunityModule } from './modules/community/community.module';
import { Community } from './modules/community/community.entity';
import { CommunityMembership } from './modules/community/community-membership.entity';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { Role } from './modules/role/role.entity';
import { Permission } from './modules/permission/permission.entity';
import { Person } from './modules/auth/person.entity';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/post.entity';
import { EventModule } from './modules/event/event.module';
import { Event } from './modules/event/event.entity';
import {ThrottlerModule} from '@nestjs/throttler';
import { OrganizationHistory } from './modules/organization/organization-history.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.prod.env',
      expandVariables: true
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 20,
    }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASSWORD'),
        entities: [User, Person, Organization, OrganizationHistory, Community, CommunityMembership, Role, Permission, Post, Event],
        synchronize: true,
        database: 'defaultdb',
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    OrganizationModule,
    HealthModule, CommunityModule, RoleModule, PermissionModule, PostModule, EventModule
  ],
  controllers: [],
  providers: [PasswordService]
})
export class AppModule { }

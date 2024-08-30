import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'admin123',
      entities: [User, Person, Organization, Community, CommunityMembership, Role, Permission],
      synchronize: true,
      database: 'contribuguate',
      extra: {
        trustServerCertificate: true
      },
      options: {
        useUTC: true
      }
    }),
    AuthModule, 
    OrganizationModule, 
    HealthModule, CommunityModule, RoleModule, PermissionModule
  ],
  controllers: [],
  providers: [PasswordService]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { HealthModule } from './modules/health/health.module';
import { PasswordService } from './tools/password.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true
    }),
    AuthModule, 
    OrganizationModule, HealthModule
  ],
  controllers: [],
  providers: [PasswordService],
})
export class AppModule {}

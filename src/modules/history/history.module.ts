import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { History } from './history.entity';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { User } from '../auth/user.entity';
import { Event } from '../event/event.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([History, User, Event]),
    JwtModule.register({}), 
  ],
  providers: [HistoryService, ConfigService], 
  controllers: [HistoryController],
})
export class HistoryModule {}

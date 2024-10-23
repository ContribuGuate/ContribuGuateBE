import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Community } from '../community/community.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Community])
    ],
    providers: [EventService],
    controllers: [EventController],
})
export class EventModule {}

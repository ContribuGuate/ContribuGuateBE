import { Body, Controller, Get, Post } from "@nestjs/common";
import { EventService } from "./event.service";
import { AddEventRequest } from "./dto/request/add-event.request";

@Controller('event')
export class EventController{

    constructor(private readonly eventService: EventService){}

    @Post('add')
    public async addEvent(@Body() body: AddEventRequest){
        return await this.eventService.addEvent(body);
    }

    @Get('all')
    public async getAllEvents(){
        return await this.eventService.getFreeEvents();
    }
}
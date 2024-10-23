import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./event.entity";
import { Repository } from "typeorm";
import { GetFreeEventsResponse } from "./dto/response/get-free-events.response";
import { AddEventRequest } from "./dto/request/add-event.request";

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>){}

    public async addEvent(request: AddEventRequest){

    }

    public async getFreeEvents(){
        var response = new GetFreeEventsResponse();
        try{
            const find = await this.eventRepository.find({
                where: {
                    community: null
                }
            });

            response.events = find;
            response.success = true;
            response.message = 'Eventos disponibles';
            return response;
        }catch(err){
            response.success = false;
            response.message = "Error al obtener los eventos";
            return response;
        }
    }

    public async getCommunityEvents(){
        var response = new GetFreeEventsResponse();
        try{
            const find = await this.eventRepository.find({
                where: {

                }
            });

            response.events = find;
            response.success = true;
            response.message = 'Eventos disponibles';
            return response;
        }catch(err){
            response.success = false;
            response.message = "Error al obtener los eventos";
            return response;
        }
    }
}
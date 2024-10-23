import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./event.entity";
import { Repository } from "typeorm";
import { GetFreeEventsResponse } from "./dto/response/get-free-events.response";
import { AddEventRequest } from "./dto/request/add-event.request";
import { AddEventResponse } from "./dto/response/add-event.response";
import { Community } from "../community/community.entity";

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    @InjectRepository(Community) private readonly communityRepository: Repository<Community>){}

    public async addEvent(request: AddEventRequest){
        var response = new AddEventResponse();
        try{
            const event = new Event();
            event.name = request.name;
            event.description = request.description;
            event.address = request.address;
            event.date = request.date;
            event.link = request.link;
            event.image = request.image;

            if(request.community){
                event.community = await this.communityRepository.findOne({
                    where: {
                        uuid: request.community
                    }
                });
            }else{
                event.community = null;
            }
            await this.eventRepository.save(event);
            response.event = event;
            response.success = true;
            response.message = 'Evento creado con exito';
            return response;
        }catch(err){
            response.success = false;
            response.message = err.message;
            return response;
        }
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
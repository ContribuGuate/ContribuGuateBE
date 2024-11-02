import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { History } from "./history.entity";
import { User } from "../auth/user.entity";
import { Event } from "../event/event.entity";
import { CreateHistoryRequest } from "./dto/create-history.request";

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History) private readonly historyRepository: Repository<History>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Event) private readonly eventRepository: Repository<Event>
    ) {}

    public async createHistory(body: CreateHistoryRequest) {
        const { usuarioId, eventoId, descripcion, fecha } = body;

        const usuario = await this.userRepository.findOneBy({ uuid: usuarioId });
        const evento = await this.eventRepository.findOneBy({ uuid: eventoId });

        if (!usuario || !evento) {
            throw new Error("Usuario o evento no encontrados");
        }

        const nuevoHistory = this.historyRepository.create({
            usuario,
            evento,
            descripcionVoluntariado: descripcion,
            fechaParticipacion: fecha
        });

        await this.historyRepository.save(nuevoHistory);
        return nuevoHistory;
    }


    public async getHistoriesByUser(usuarioId: string) {
        return this.historyRepository.find({
            where: { usuario: { uuid: usuarioId } },
            relations: ['usuario', 'evento'],
        });
    }
}

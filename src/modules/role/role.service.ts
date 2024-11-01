import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService{
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>){}

    public async getDefaultRole(){
        return await this.roleRepository.findOne({where: {name: "member"}});
    }

    public async getAdminRole(){
        const find = await this.roleRepository.findOne({where: {name: "administrator"}});
        if(!find){
            const role = new Role();
            role.name = "admin";
            role.description = "Administrador de la comunidad";
            const creation = await this.roleRepository.save(role);
            return creation;
        }else{
            return find;
        }

    }
}
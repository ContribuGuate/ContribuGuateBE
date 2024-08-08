import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service";

@Controller('health')
export class HealthController{

    constructor(private health: HealthService){}

    @Get('database')
    public async checkDatabase(){
        return this.health.checkDatabase();
    }

    @Get('disk')
    public async checkDisk(){
        return this.health.checkDisk();
    }
}
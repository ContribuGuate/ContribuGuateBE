import { Injectable } from "@nestjs/common";
import { DiskHealthIndicator, HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from "@nestjs/terminus";

@Injectable()
export class HealthService{
    constructor(private health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
        private readonly disk: DiskHealthIndicator
    ){}


    @HealthCheck()
    checkDatabase(){
        return this.health.check([
            () => this.db.pingCheck('database')
        ])
    }


    @HealthCheck()
    checkDisk(){
        
    }
}
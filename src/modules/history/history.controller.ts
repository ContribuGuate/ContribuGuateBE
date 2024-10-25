import { Body, Controller, Get, Param, Post, UseGuards, Logger } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { CreateHistoryRequest } from "./dto/create-history.request";
import { AuthGuard } from "src/tools/auth.guard";

@Controller('history')
export class HistoryController {
    private readonly logger = new Logger(HistoryController.name);

    constructor(private readonly historyService: HistoryService) {}

    
    @Post('create')
    public async createHistory(@Body() body: CreateHistoryRequest) {
        this.logger.log('Mapped {/history/create, POST} route');
        return this.historyService.createHistory(body);
    }

    @UseGuards(AuthGuard)
    @Get('user/:usuarioId')
    public async getHistoriesByUser(@Param('usuarioId') usuarioId: string) {
        this.logger.log(`Mapped {/history/user/${usuarioId}, GET} route`);
        return this.historyService.getHistoriesByUser(usuarioId);
    }
}

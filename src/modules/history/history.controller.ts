import { Body, Controller, Get, Param, Post, UseGuards, Logger, Req} from "@nestjs/common";
import { HistoryService } from "./history.service";
import { CreateHistoryRequest } from "./dto/create-history.request";
import { AuthGuard } from "src/tools/auth.guard";

@Controller('history')
export class HistoryController {
    private readonly logger = new Logger(HistoryController.name);

    constructor(private readonly historyService: HistoryService) {}

    
    @Post('create')
    public async createHistory(@Body() body: CreateHistoryRequest) {
        return this.historyService.createHistory(body);
    }

    @UseGuards(AuthGuard)
    @Get('user')
    public async getHistoriesByUser(@Req() req: any) {
        const usuarioId = req.user.sub; 
        return this.historyService.getHistoriesByUser(usuarioId);
    }
}

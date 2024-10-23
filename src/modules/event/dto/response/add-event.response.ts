import { BaseResponse } from "src/core/http/BaseResponse";
import { Event } from "../../event.entity";

export class AddEventResponse extends BaseResponse{
    public event: Event = null;
}
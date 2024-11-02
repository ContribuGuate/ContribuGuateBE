
import { BaseResponse } from 'src/core/http/BaseResponse';
import { Event } from '../../event.entity';
export class GetFreeEventsResponse extends BaseResponse{
    public events: Event[] = null;
}
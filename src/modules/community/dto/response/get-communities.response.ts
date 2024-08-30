import { BaseResponse } from "src/core/http/BaseResponse";
import { Community } from "../../community.entity";

export class GetCommunitiesResponse extends BaseResponse{
    public communities: Community[] = [];
}
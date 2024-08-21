import { BaseResponse } from "src/core/http/BaseResponse";
import { Community } from "../../community.entity";

export class AddCommunityResponse extends BaseResponse{
    public community: Community = null;
}
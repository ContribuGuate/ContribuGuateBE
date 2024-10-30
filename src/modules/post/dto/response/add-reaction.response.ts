import { BaseResponse } from "src/core/http/BaseResponse";
import { PostReaction } from "../../post-reaction.entity";

export class AddReactionResponse extends BaseResponse{
    public reaction: PostReaction = null;
}
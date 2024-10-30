import { BaseResponse } from "src/core/http/BaseResponse";
import { Post } from "../../post.entity";

export class GetPostsResponse extends BaseResponse {
    public posts: Post[] = [];
}
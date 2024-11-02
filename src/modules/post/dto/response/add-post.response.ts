import { BaseResponse } from "src/core/http/BaseResponse";
import { Post } from "../../post.entity";

export class AddPostResponse extends BaseResponse{
    public post: Post = null;
}
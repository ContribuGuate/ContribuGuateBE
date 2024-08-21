import { BaseResponse } from "src/core/http/BaseResponse";

export class LoginResponse extends BaseResponse{
    public token: string = null;
}
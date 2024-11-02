import { BaseResponse } from "src/core/http/BaseResponse";
import { Role } from "src/modules/role/role.entity";

export class LoginResponse extends BaseResponse{
    public token: string = null;
    public role: Role = null;
}
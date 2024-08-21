import { BaseResponse } from "src/core/http/BaseResponse";
import { User } from "../../user.entity";
import { Person } from "../../person.entity";

export class RegisterResponse extends BaseResponse{
    public user: User = null;
    public person: Person = null;
}
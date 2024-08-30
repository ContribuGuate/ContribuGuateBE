import { BaseResponse } from "src/core/http/BaseResponse";
import { Organization } from "../../organization.entity";

export class GetOrganizationResponse extends BaseResponse{
    public organization: Organization = null
}
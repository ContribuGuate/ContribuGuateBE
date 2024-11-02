import { BaseResponse } from "src/core/http/BaseResponse";
import { Organization } from "../../organization.entity";

export class GetOrganizationsResponse extends BaseResponse {
    public organizations: Organization[] = [];
}

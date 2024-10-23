import { BaseResponse } from "src/core/http/BaseResponse";
import { OrganizationHistory } from "../../organization-history.entity";
import { Organization } from "../../organization.entity";

export class GetOrganizationTrackingResponse extends BaseResponse{
    public organization: Organization = null;
}
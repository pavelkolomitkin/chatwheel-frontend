import {AbuseReportType} from "./abuse-report-type.model";
import {User} from "../../../security/data/models/user.model";

export class AbuseReport
{
  id: string;

  type: AbuseReportType;

  applicant: User;

  respondent: User;

  createdAt: string;

  updatedAt: string;

  description: string;

  new: boolean;

  static createFromRawData(data)
  {
    const result: AbuseReport = Object.assign(new AbuseReport(), data);

    result.applicant = User.createFromRawData(result.applicant);
    result.respondent = User.createFromRawData(result.respondent);

    return result;
  }
}

import {AbuseReportType} from "../../../../core/data/models/abuse-report-type.model";

export interface AbuseReportTypeStatistic
{
  abuseType: AbuseReportType;

  totalNumber: number
}

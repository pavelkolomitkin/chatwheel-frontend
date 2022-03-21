import {SortingType} from '../../../core/data/models/sorting-type.enum';
import {AbuseReportType} from "../../../core/data/models/abuse-report-type.model";

export interface AbuseReportListFilter
{
  new?: boolean;
  type?: AbuseReportType;

  sortField?: string;
  sortType?: SortingType;
}

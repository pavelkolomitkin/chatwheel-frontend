import {SortingType} from '../../../core/data/models/sorting-type.enum';

export interface AdminUserListFilter
{
  email?: string;
  isBlocked?: boolean;
  isDeleted?: boolean;

  sortField?: string;
  sortType?: SortingType;
}

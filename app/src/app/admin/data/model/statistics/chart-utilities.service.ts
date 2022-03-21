import {MonthAxisItem} from "./month-axis-item.model";
import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {MONTH_NAMES} from "./month.names";

@Injectable()
export class ChartUtilitiesService
{
  constructor(
    private translate: TranslateService
  ) {
  }

  async getMonthsAxis(startMonth: Date, endMonth: Date): Promise<MonthAxisItem[]>
  {
    const result: MonthAxisItem[] = [];

    let currentYear: number = startMonth.getFullYear();
    let currentMonth: number = startMonth.getMonth();

    const lastYear: number = endMonth.getFullYear();
    const lastMonth: number = endMonth.getMonth();

    while (currentYear <= lastYear)
    {
      while (currentMonth < 12)
      {
        const axisItem = await this.getAxisItem(currentYear, currentMonth);
        result.push(axisItem);

        if (currentMonth === lastMonth)
        {
          break;
        }

        currentMonth++;
      }

      currentMonth = 0;

      currentYear++;
    }

    return result;
  }

  async getAxisItem(year: number, month: number)
  {
    const monthName = MONTH_NAMES[month];
    const i18nMonthName = await this.translate.get(monthName).toPromise();

    return {
      year,
      month: month + 1,
      monthName: i18nMonthName
    };
  }

}

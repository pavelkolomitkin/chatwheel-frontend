import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-online-user-number-dynamic',
  templateUrl: './online-user-number-dynamic.component.html',
  styleUrls: ['./online-user-number-dynamic.component.css']
})
export class OnlineUserNumberDynamicComponent implements OnInit, OnDestroy {

  static BASE_USER_NUMBER_VALUE: number = 10329;
  static RANGE_USER_NUMBER_VALUE: number = 50;
  currentValue: number = null;

  numberUserChangeInterval: any = null;

  constructor() { }

  initUserNumberChange()
  {
    this.updateUserNumber();
    this.numberUserChangeInterval = setInterval(this.updateUserNumber, 3000);
  }

  clearUserNumberChange()
  {
    if (!!this.numberUserChangeInterval)
    {
      clearInterval(this.numberUserChangeInterval);
      this.numberUserChangeInterval = null;
    }
  }

  updateUserNumber = () => {

    let difference: number = Math.round(OnlineUserNumberDynamicComponent.RANGE_USER_NUMBER_VALUE * Math.random());

    if (Math.random() < 0.5)
    {
      difference *= -1;
    }

    this.currentValue = OnlineUserNumberDynamicComponent.BASE_USER_NUMBER_VALUE + difference;
  }

  ngOnInit(): void {
    this.initUserNumberChange();
  }

  ngOnDestroy(): void {
    this.clearUserNumberChange();
  }

}

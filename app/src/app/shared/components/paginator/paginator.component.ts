import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnDestroy {

  page: number = 0;

  _totalItems: number = 0;

  queryStringParams: {};

  numberOfPages: number = 0;

  queryParamsSubscription: Subscription;

  locationPath: string;

  @Input() itemsOnPage: number = 10;

  @Input()
  set totalItems(value)
  {
    this._totalItems = value;

    this.numberOfPages = Math.ceil(this._totalItems / this.itemsOnPage);
  }


  constructor(
      private route: ActivatedRoute,
      public location: Location
  ) { }

  ngOnInit() {

    this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {

      this.queryStringParams = params;

      //this.locationPath = this.location.path();
      this.locationPath = window.location.pathname;

      this.page = (!!params.page && params.page > 0) ? params.page : 1;

    });

  }

  ngOnDestroy(): void {

    this.queryParamsSubscription.unsubscribe();

  }

  getQueryParameters(page: number)
  {
    return {...this.queryStringParams, page: page};
  }

}

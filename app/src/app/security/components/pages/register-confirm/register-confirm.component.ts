import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {UserRegisterConfirmStart} from "../../../data/actions";
import {AccountConfirmationActions} from "../../../data/reducer";
import {User} from "../../../data/models/user.model";

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit, OnDestroy {

  routeParamSubscription: Subscription = null;
  confirmationActionSubscription: Subscription = null;
  userSubscription: Subscription = null;

  action: string = 'NONE';

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.params.pipe(
      map(params => params.key),
      filter(key => !!key)
    ).subscribe((key:string) => {

      this.store.dispatch(new UserRegisterConfirmStart(key));
    });

    this.confirmationActionSubscription = this.store.pipe(
      select(state => state.security.accountActivationAction),
      filter(action => action !== AccountConfirmationActions.NONE)
    ).subscribe((action) => {

      if (action === AccountConfirmationActions.SUCCESS)
      {
        this.action = 'SUCCESS';
      }
      else
      {
        this.action = 'ERROR';
      }
    });

    this.userSubscription = this.store.pipe(
      select(state => state.security.user),
      filter(user => !!user)
    ).subscribe((user: User) => {
      if (this.action === 'SUCCESS')
      {
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 2000);
      }
    })
  }

  ngOnDestroy(): void {

    if (this.routeParamSubscription !== null)
    {
      this.routeParamSubscription.unsubscribe();
      this.routeParamSubscription = null;
    }

    if (this.confirmationActionSubscription !== null)
    {
      this.confirmationActionSubscription.unsubscribe();
      this.confirmationActionSubscription = null;
    }

    if (this.userSubscription !== null)
    {
      this.userSubscription.unsubscribe();
      this.userSubscription = null;
    }
  }

}

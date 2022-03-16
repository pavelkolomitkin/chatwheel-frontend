import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientUserService} from "../../../../services/client-user.service";
import {User} from "../../../../../security/data/models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-client-profile-page',
  templateUrl: './client-profile-page.component.html',
  styleUrls: ['./client-profile-page.component.css']
})
export class ClientProfilePageComponent implements OnInit, OnDestroy {


  routeParamSubscription: Subscription;

  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ClientUserService
  ) { }

  ngOnInit(): void {

    this.routeParamSubscription = this.route.parent.params.subscribe(async (params) => {

      const { id } = params;

      try {
        this.user = await this.service.getUser(id).toPromise();
      }
      catch (error)
      {
        await this.router.navigateByUrl('./404');
        return;
      }


    });

  }

  ngOnDestroy(): void {

    this.routeParamSubscription.unsubscribe();

  }

}

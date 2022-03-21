import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientUserService} from "../../../../services/client-user.service";
import {User} from "../../../../../security/data/models/user.model";
import {Subscription} from "rxjs";
import {AbuseReportService} from "../../../../services/abuse-report.service";
import {AbuseReport} from "../../../../../core/data/models/abuse-report.model";

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
    private service: ClientUserService,
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

    if (!!this.routeParamSubscription)
    {
      this.routeParamSubscription.unsubscribe();
    }

  }



}

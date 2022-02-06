import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, of} from "rxjs";
import {SecurityService} from "../../../services/security.service";

@Component({
  selector: 'app-restore-password-request',
  templateUrl: './restore-password-request.component.html',
  styleUrls: ['./restore-password-request.component.css']
})
export class RestorePasswordRequestComponent implements OnInit, OnDestroy {

  errors: Observable<Object>;

  secondsLeft: number = 0;
  wasError: boolean = false;

  secondsLeftTimer = null;

  constructor(
    private service: SecurityService,
  ) { }

  onEmailChangeHandler(event)
  {
    this.secondsLeft = 0;
  }

  ngOnInit(): void {
    this.secondsLeftTimer = setInterval(() => {

      if (this.secondsLeft > 0)
      {
        this.secondsLeft--;
      }

    }, 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.secondsLeftTimer);
  }

  async onSubmit(form: NgForm)
  {
    const { email } = form.value;

    try {
      const data = await this.service.passwordRestoreRequest(email).toPromise();
      this.secondsLeft = data.secondsLeft;
      this.wasError = false;
      this.errors = null;
    }
    catch (error)
    {
      if (typeof error.error.errors.secondsLeft !== 'undefined')
      {
        this.secondsLeft = error.error.errors.secondsLeft;
        this.errors = of(null);
      }
      else if (typeof error.error.errors.email !== 'undefined')
      {
        this.errors = of(error.error.errors);
        this.secondsLeft = 0;
      }

      this.wasError = true;
    }
  }
}

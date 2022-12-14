import {Component, OnDestroy, OnInit} from '@angular/core';
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";
import {filter, Subject, takeUntil} from "rxjs";
import {EventMessage, EventType} from "@azure/msal-browser";
import {JavaAPIDemoServiceService} from "../../core/services/java-apidemo-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isUserLoggedIn: boolean = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(private broadcastService: MsalBroadcastService,
              private authService: MsalService,
              private javaApiDemoService: JavaAPIDemoServiceService) { }

  ngOnInit(): void {
    this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        // Do something with event payload here
        console.log(result);
      });
  }

  login() {
    if(!this.isUserLoggedIn) {
      this.authService.loginPopup(
        {
          scopes: ['user.read'],
        }
      );
      this.isUserLoggedIn=this.authService.instance.getAllAccounts().length>0;
    } else {
      //
    }
  }

  logout() {
    if (this.isUserLoggedIn) {
      this.authService.logoutPopup({
          mainWindowRedirectUri: "/"
        //DA IMPLEMENTARE
        }
      );
    }
  }

  getHello() {
    this.javaApiDemoService.getHello().subscribe(next => console.log(next)
    );
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

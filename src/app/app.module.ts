import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MsalInterceptor, MsalModule} from "@azure/msal-angular";
import {InteractionType, PublicClientApplication} from "@azure/msal-browser";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1
  || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot( new PublicClientApplication(
      {
        auth: {
          clientId: '2a8d2897-cbe8-40b1-82c7-d114b37e14ea',
          postLogoutRedirectUri: '',
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE,
        }
      }),
      {
        interactionType: InteractionType.Popup, // Msal Guard Configuration
        authRequest: {
          scopes: ['User.Read'],
        },
    },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/v1.0/me", ["User.Read"]]
        ]),
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

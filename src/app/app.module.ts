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
          clientId: '710babd1-ca29-4e0d-a070-32e41d627ee5',
          authority: 'https://login.microsoftonline.com/fe74d98f-5ec3-4998-8af9-03bb9de60851',
          redirectUri:'http://localhost:4200',
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
          ["https://graph.microsoft.com/v1.0/me", ["User.Read"]],
          ["localhost",["api://6f9d2a39-de64-4604-bf98-617c17677168/File.Read"]]
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

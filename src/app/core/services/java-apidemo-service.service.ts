import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JavaAPIDemoServiceService {

  constructor(private httpClient: HttpClient) { }

  getHello(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/hello')
  }

  getHome(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/home')
  }

  getInfo(): Observable<any> {
    return this.httpClient.get('https://graph.microsoft.com/v1.0/me')
  }
}

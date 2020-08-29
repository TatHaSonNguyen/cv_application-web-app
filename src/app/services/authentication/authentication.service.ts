import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthenticationToken} from '../../models/authentication-token.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public resourceUrl = environment.SERVER_API_URL + 'api/token';
  private currentAuthenticationTokenSubject: BehaviorSubject<AuthenticationToken>;
  constructor(protected http: HttpClient) {
    localStorage.removeItem('currentAuthenticationToken');
  }
  public get currentAuthenticationTokenValue(): AuthenticationToken {
    this.currentAuthenticationTokenSubject = new BehaviorSubject<AuthenticationToken>(JSON.parse(localStorage.getItem('currentAuthenticationToken')));
    return this.currentAuthenticationTokenSubject.value;
  }

  public getToken(): Observable<AuthenticationToken> {
    return this.http
      .get<any>(this.resourceUrl)
      .pipe(map(res => {
        const authenticationToken = new AuthenticationToken(
          res.token_type ? res.token_type : '',
          res.expires_in ? res.expires_in : 0,
          res.access_token ? res.access_token : '',
          res.scope ? res.scope : ''
        );
        localStorage.setItem('currentAuthenticationToken', JSON.stringify(authenticationToken));
        this.currentAuthenticationTokenSubject.next(authenticationToken);
        return authenticationToken;
      }));
  }
}

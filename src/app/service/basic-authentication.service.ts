import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL, AUTHENTICATED_USER, TOKEN } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeBasicAuthenticationService(username, password) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, { headers }).pipe(
      // if request success, map it to the following function
      map(data => {
        sessionStorage.setItem(AUTHENTICATED_USER, username);
        sessionStorage.setItem(TOKEN, basicAuthHeaderString);
        return data;
      }));
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    let token = sessionStorage.getItem(TOKEN);
    return !(user === null && token === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

export class AuthenticationBean {
  constructor(private message: string) { }
}

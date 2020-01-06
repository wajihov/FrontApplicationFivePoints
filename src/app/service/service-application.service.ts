import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: "root"
})
export class ServiceApplicationService {
  usernameConnected: any;
  constructor(private http: HttpClient) {
    this.usernameConnected = this.decodeToken();
  }

  url = "http://localhost:8080/api/auth";

  postUsername(name: String) {
    return this.http.post(this.url + "/username", name);
  }

  postEmail(mail: String) {
    return this.http.post(this.url + "/email", mail);
  }

  postSignUp(formRegister: any) {
    return this.http.post(this.url + "/signup", formRegister);
  }

  postSignIn(formAuth: any) {
    return this.http.post(this.url + "/signin", formAuth);
  }
  decodeToken() {
    const token = localStorage.getItem('token');
    return jwt_decode(token).sub;
  }
}
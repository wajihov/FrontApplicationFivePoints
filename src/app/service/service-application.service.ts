import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { ServProfileService } from "./profile/serv-profile.service";

@Injectable({
  providedIn: "root"
})
export class ServiceApplicationService {
  usernameConnected: any;
  //idUserConnect: any;

  constructor(
    private http: HttpClient,
    private serviceProfile: ServProfileService
  ) {
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
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      //console.log("l'utisateur : decode_Token : ", jwt_decode(token).sub);
      return jwt_decode(token).sub;
    }
    return null;
  }

  /* decodeUserConnect() {
    if (localStorage.getItem("userConnect")) {
      const decodeUser = localStorage.getItem("user");
      console.log("l'utisateur : decode_Token : ", jwt_user(decodeUser).sub);
      return jwt_decode(decodeUser).sub;
    }
    return null;
  } */

  logoutProfile() {
    localStorage.removeItem("token");
    this.usernameConnected = "";
  }

  GetPageResetPassword(id: number) {
    return this.http.get(this.url + "/reset-password/" + id);
  }

  putNewPassword(id: number, data: any) {
    return this.http.put(this.url + "/EntredPassword/" + id, data);
  }

  postMail(data: any) {
    return this.http.post(this.url + "/sendSimpleEmail", data);
  }
}

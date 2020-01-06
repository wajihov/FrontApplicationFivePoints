import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServiceApplicationService {
  constructor(private http: HttpClient) {}

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
}
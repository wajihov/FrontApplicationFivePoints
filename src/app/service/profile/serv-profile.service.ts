import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceApplicationService } from "../service-application.service";

@Injectable({
  providedIn: "root"
})
export class ServProfileService {
  url = "http://localhost:8080/api/users";
  header: any;
  constructor(
    private http: HttpClient,
    private serviceProfile: ServiceApplicationService
  ) {}

  getHeader() {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
  }

  getProfile(username: String) {
    this.getHeader();
    return this.http.get(this.url + "/getUser/" + username, {
      headers: this.header
    });
  }

  getIdUsername(username: String) {
    this.getHeader();
    return this.http.post(this.url + "/majUsername", username, {
      headers: this.header
    });
  }

  getIdEmail(email: String) {
    this.getHeader();
    return this.http.post(this.url + "/majEmail", email, {
      headers: this.header
    });
  }

  updateAccount(idProfile: any, profileModify: any) {
    this.getHeader();
    return this.http.put(
      this.url + "/updateAccount/" + idProfile,
      profileModify,
      {
        headers: this.header
      }
    );
  }

  updateProfile(idProfile: any, profileModify: any) {
    console.log("id ", idProfile, " profile ", profileModify);
    
    this.getHeader();
    return this.http.put(
      this.url + "/updateProfile/" + idProfile,
      profileModify,
      { headers: this.header }
    );
  }

  resultComparePassword(mail: any) {
    this.getHeader();
    return this.http.post(this.url + "/verifPassword", mail, {
      headers: this.header
    });
  }
}

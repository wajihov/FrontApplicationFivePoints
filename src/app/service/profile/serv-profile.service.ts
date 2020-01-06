import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServProfileService {
  url = "http://localhost:8080/api/users";
  constructor(private http: HttpClient) {}

  getProfile(username: String) {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    return this.http.get(this.url + "/getUser/" + username, {
      headers: header
    });
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServiceImageService {
  urlImage = "http://localhost:8080/api/image";
  header: any;
  constructor(private http: HttpClient) {}

  getHeader() {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
  }

  deleteImage(id: Number) {
    console.log("id image ", id);
    
    this.getHeader();
    return this.http.delete(this.urlImage + "/deleteImage/" + id, {
      headers: this.header
    });
  }
}

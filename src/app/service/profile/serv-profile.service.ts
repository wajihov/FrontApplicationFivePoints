import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServProfileService {
  url = "http://localhost:8080/api/users";
  urlImage = "http://localhost:8080/api/image";
  header: any;
  //userSelected: any;
  constructor(private http: HttpClient) {}

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

  saveImage(file: any) {
    this.getHeader();
    return this.http.post(this.urlImage + "/upload", file, {
      headers: this.header
    });
  }

  displayImage(nameImage: any) {
    this.getHeader();
    let urlimg = this.urlImage + "/get-image/" + nameImage;
    console.log("dans service display image : " + urlimg);
    return this.http.get(urlimg, {
      headers: this.header
    });
  }

  getAllProfiles() {
    this.getHeader();
    return this.http.get(this.url + "/getAll", {
      headers: this.header
    });
  }

  getUser(index: number) {
    console.log("dans getUser ", index);
    this.getHeader();
    return this.http.get(this.url + "/get/" + index, {
      headers: this.header
    });
  }

  getImage(nameImage: String) {
    this.getHeader();
    return this.http.get(this.urlImage + "/sid/" + nameImage, {
      headers: this.header
    });
  }

  getImage2() {
    this.getHeader();
    return this.http.get(this.urlImage + "/sid", {
      headers: this.header
    });
  }

  saveImageProfile(file: any, idUser: number) {
    this.getHeader();
    return this.http.post(
      this.urlImage + "/uploadImgProfile/" + idUser,
      file,
      {
        headers: this.header
      }
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { HttpClient } from "@angular/common/http";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public userFile: any = File;
  userData: any;
  listNameImages: any;  
  displayImg: any;

  constructor(
    private serviceProfile: ServProfileService,
    private service: ServiceApplicationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.serviceProfile
      .getProfile(this.service.usernameConnected)
      .subscribe(data => {
        console.log("le username est : ", this.service.usernameConnected);
        this.userData = data;
        console.log("le nom est : ", this.userData);
        this.listNameImages = this.userData.images;
        console.log("the images are : ", this.listNameImages);
      });
    this.serviceProfile.displayImage("image1.jpg").subscribe(
      response => {
        this.displayImg = response;
        console.log("display image", response);
      },
      errooor => {
        console.log("Erreur display image : ", errooor);
      }
    ),
      err => {
        console.log("Error display image : ", err);
      };
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    console.log("image [@]: ", file);
    this.userFile = file;
    const formData = new FormData();
    formData.append("file", this.userFile, this.userFile.name);
    this.serviceProfile.saveImage(formData).subscribe(data => {
      console.log("data : image ", data);
    });
  }
}

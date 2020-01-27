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
  pathImage: any;
  nameImage = "Tigre.jpg";

  constructor(
    private serviceProfile: ServProfileService,
    private service: ServiceApplicationService
  ) {}

  ngOnInit() {
    this.serviceProfile.getProfile(this.service.usernameConnected).subscribe(
      data => {
        console.log("le username est : ", this.service.usernameConnected);
        this.userData = data;
        console.log("le nom est : ", this.userData);
        this.listNameImages = this.userData.images;
        console.log("the images are : ", this.listNameImages);
      },
      err => {
        console.log("Error display image : ", err);
      }
    );
    /* this.serviceProfile.displayImage("image1.jpg").subscribe(
      response => {
        this.displayImg = response;
        console.log("display image", response);
      },
      errooor => {
        console.log("Erreur display image : ", errooor);
      }
    ); */
    /* this.serviceProfile.getImage("Tigre.jpg").subscribe(
      data => {
        console.log("hello dans getImage");

        this.pathImage = data;
        console.log("pathImage : ", this.pathImage);
        console.log("pathImage Data : ", data);
      },
      error => {
        console.log("Erreur display image : ", error);
      }
    ); */
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

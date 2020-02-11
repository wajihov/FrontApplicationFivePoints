import { Component, OnInit, Renderer2 } from "@angular/core";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  userFile: any = File;
  ImageProfile: any = File;
  userData: any;
  listNameImages: any;
  listAmis: any = [];

  constructor(
    private serviceProfile: ServProfileService,
    private service: ServiceApplicationService,
    private render: Renderer2
  ) {}

  ngOnInit() {
    this.serviceProfile.getProfile(this.service.usernameConnected).subscribe(
      data => {
        this.userData = data;
        this.listNameImages = this.userData.images;
        this.serviceProfile
          .getListAmis(this.userData.id)
          .subscribe(response => {
            this.listAmis = response;
            console.log(this.listAmis);
          });
      },
      err => {
        console.log("Error display image : ", err);
      }
    );
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    console.log("image [@]: ", file);
    this.userFile = file;
    const formData = new FormData();
    formData.append("file", this.userFile, this.userFile.name);
    console.log(formData.get("file"));

    this.serviceProfile.saveImage(formData).subscribe(data => {
      console.log("data : image ", data);
      this.ngOnInit();
    });
    // this.refresh();
  }

  onSelectFileImgProfile(event2: any) {
    const fileProfile = event2.target.files[0];
    this.ImageProfile = fileProfile;
    console.log("test file", fileProfile);
    const formData = new FormData();
    formData.append("file", this.ImageProfile, this.ImageProfile.name);
    console.log(formData.get("file"));

    this.serviceProfile
      .saveImageProfile(formData, this.userData.id)
      .subscribe(data => {
        console.log("le nom est : ", data);
        this.refresh();
        // renderer2 angular
      });
  }
  refresh(): void {
    window.location.reload();
  }
}

import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import * as moment from "moment";


@Component({
  selector: "app-friend",
  templateUrl: "./friend.component.html",
  styleUrls: ["./friend.component.scss"]
})
export class FriendComponent implements OnInit {
  userData: any;
  listAmis: any = [];
  listNameImages: any;
  url = "http://localhost:8080/api/image/getPhoto";

  constructor(
    private serviceProfile: ServProfileService,
    private service: ServiceApplicationService
  ) {}

  ngOnInit() {
    console.log("connected : ", this.service.usernameConnected);
    
    this.serviceProfile.getProfile(this.service.usernameConnected).subscribe(
      data => {
        this.userData = data;
        this.listNameImages = this.userData.images;
        this.serviceProfile
          .getListAmis(this.userData.id)
          .subscribe(response => {
            this.listAmis = response;
            console.log(this.listAmis.name);
          });
      },
      err => {
        console.log("Error display image : ", err);
      }
    );
  }
  public ageFromBirthdate(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, "years");
  }
}

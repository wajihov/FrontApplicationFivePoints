import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import * as moment from "moment";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"]
})
export class ProfilesComponent implements OnInit {
  public listProfiles: any;
  getUser: any;

  url = "http://localhost:8080/api/image/getPhoto";

  constructor(private serviceProfile: ServProfileService) {}

  ngOnInit() {
    this.serviceProfile.getAllProfiles().subscribe(
      response => {
        console.log("les profiles : ", response);
        this.listProfiles = response;
      },
      error => {
        console.log("erreur de chargement profiles : ", error);
      }
    );
  }

  public ageFromDateBirth(dateOfBirth: any): number {
    const today = new Date();
    const birthdate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  }

  public ageFromBirthdate(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, "years");
  }
}

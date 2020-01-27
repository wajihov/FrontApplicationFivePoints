import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"]
})
export class ProfilesComponent implements OnInit {
  public listProfiles: any;
  getUser: any;
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
}

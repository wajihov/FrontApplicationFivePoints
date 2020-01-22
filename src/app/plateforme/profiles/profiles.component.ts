import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"]
})
export class ProfilesComponent implements OnInit {
  listProfiles: any;
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
    console.log("Profiles : ", this.listProfiles);
  }

  goToUser(i) {
    this.serviceProfile.getUser(i).subscribe(
      response => {
        this.getUser = response;
      },
      error => {
        console.log("error de chargement personne", error);
      }
    );
  }
}

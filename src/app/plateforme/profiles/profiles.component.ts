import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import * as moment from "moment";
import { ServiceApplicationService } from "src/app/service/service-application.service";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"]
})
export class ProfilesComponent implements OnInit {
  public listProfiles: any = [];
  getUser: any;
  dataUser: any;
  formMatching: any;
  listDisabled: any = [];

  url = "http://localhost:8080/api/image/getPhoto";

  constructor(
    private serviceProfile: ServProfileService,
    private service: ServiceApplicationService
  ) {}

  ngOnInit() {
    this.serviceProfile.getAllProfiles().subscribe(
      response => {
        this.listProfiles = response;
        this.serviceProfile
          .getProfile(this.service.usernameConnected)
          .subscribe(data => {
            this.getUser = data;
            this.listProfiles = this.listProfiles.filter(
              element => element.id !== this.getUser.id
            );
            this.listDisabled=this.getUser.users;
            console.log('list match ', this.listDisabled);
            
          });
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

  following(i: number) {
    this.serviceProfile
      .getProfile(this.service.usernameConnected)
      .subscribe((item: any) => {
        this.dataUser = item;
        this.formMatching = {
          idFrom: this.dataUser.id,
          idTo: i
        };
        this.serviceProfile
          .postMatching(this.formMatching)
          .subscribe(data => console.log("Post was done successsfully"));
      });
  }
}

import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import * as moment from "moment";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { element } from "protractor";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"]
})
export class ProfilesComponent implements OnInit {
  public listProfiles: any = [];
  public listAmant: any = [];
  public listSentMatching: any = [];
  getUser: any;
  dataUser: any;
  formMatching: any;
  listDisabled: any = [];
  listUserMatched: any = [];

  url = "http://localhost:8080/api/image/getPhoto";

  constructor(
    private serviceProfile: ServProfileService,
    private service: ServiceApplicationService
  ) {}

  ngOnInit() {
    this.serviceProfile.getAllProfiles().subscribe((obj: any) => {
      this.listProfiles = obj;
      console.log("Tt users : ", this.listProfiles);

      this.serviceProfile
        .getProfile(this.service.usernameConnected)
        .subscribe((user: any) => {
          this.getUser = user;
          console.log("user : ", this.getUser);
          this.listProfiles = this.listProfiles.filter(
            element => element.id !== this.getUser.id
          );
          console.log("tt user ss userConnect : ", this.listProfiles);
          this.serviceProfile
            .getListAmis(this.getUser.id)
            .subscribe((resp: any) => {
              this.listAmant = resp;
              console.log("les amis : ", this.listAmant);
              for (let i = 0; i < this.listProfiles.length; i++) {
                for (let j = 0; j < this.listAmant.length; j++) {
                  if (this.listProfiles[i].id === this.listAmant[j].id) {
                    this.listProfiles.splice(i, 1);
                  }
                }
              }
              console.log("list ss amis ", this.listProfiles);
              //liste que l'user matching
              this.serviceProfile
                .getlistMatched(this.getUser.id)
                .subscribe((res: any) => {
                  this.listDisabled = res;
                  console.log(this.listDisabled);
                  for (let k = 0; k < this.listProfiles.length; k++) {
                    for (let l = 0; l < this.listDisabled.length; l++) {
                      if (this.listProfiles[k].id === this.listDisabled[l].id) {
                        this.listProfiles.splice(k, 1);
                      }
                    }
                  }
                  console.log(this.listProfiles);
                  //liste user matched
                  this.serviceProfile
                    .getListMatchedUser(this.getUser.id)
                    .subscribe((resp2: any) => {
                      this.listUserMatched = resp2;
                      for (let f = 0; f < this.listProfiles.length; f++) {
                        for (let g = 0; g < this.listUserMatched.length; g++) {
                          if (
                            this.listProfiles[f].id ===
                            this.listUserMatched[g].id
                          ) {
                            //this.listProfiles.splice(f, 1);
                            console.log(this.listProfiles[f].id);
                            this.listProfiles[f].etat = true;
                          }
                        }
                      }
                      console.log(this.listProfiles);
                    });
                });
            });
        });
    });
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
        console.log("item : ", i, " user : ", this.dataUser.id);
        this.formMatching = {
          idFrom: this.dataUser.id,
          idTo: i
        };
        this.serviceProfile
          .postMatching(this.formMatching)
          .subscribe(data => console.log("Post was done successsfully"));
        this.ngOnInit();
      });
  }
}

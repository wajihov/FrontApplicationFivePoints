import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { ActivatedRoute } from "@angular/router";
import { ServiceApplicationService } from "src/app/service/service-application.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  user: any;
  dataUser: any;
  formMatching: any;
  constructor(
    private serviceProfile: ServProfileService,
    private route: ActivatedRoute,
    private service: ServiceApplicationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.serviceProfile.getUser(id).subscribe(
      response => {
        this.user = response;
      },
      err => {
        console.log("error : ", err);
      }
    );
  }

  following() {
    this.serviceProfile
      .getProfile(this.service.usernameConnected)
      .subscribe((item: any) => {
        console.log("username : ", item);
        this.dataUser = item;
        console.log(this.dataUser.id);
        this.formMatching = {
          idFrom: this.dataUser.id,
          idTo: this.user.id
        };
        this.serviceProfile.postMatching(this.formMatching);
      });
  }
}

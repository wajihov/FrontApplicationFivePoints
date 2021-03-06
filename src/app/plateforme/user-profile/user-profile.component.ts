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
  listImageUser: any = [];
  url = "http://localhost:8080/api/image/getPhoto";

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
        this.listImageUser = this.user.images;
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
        this.dataUser = item;
        console.log(this.dataUser.id);
        this.formMatching = {
          idFrom: this.dataUser.id,
          idTo: this.user.id
        };

        console.log(
          "id form " +
            this.formMatching.idFrom +
            " id to " +
            this.formMatching.idTo
        );
        this.serviceProfile
          .postMatching(this.formMatching)
          .subscribe(data => console.log("Post was done successsfully"));
      });
  }
}

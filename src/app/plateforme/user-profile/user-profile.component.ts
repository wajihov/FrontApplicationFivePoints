import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  user: any;
  constructor(
    private serviceProfile: ServProfileService,
    private route: ActivatedRoute
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
}

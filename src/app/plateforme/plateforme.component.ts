import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "../service/profile/serv-profile.service";
import { Router } from "@angular/router";
import { ServiceApplicationService } from "../service/service-application.service";

@Component({
  selector: "app-plateforme",
  templateUrl: "./plateforme.component.html",
  styleUrls: ["./plateforme.component.scss"]
})
export class PlateformeComponent implements OnInit {
  userData: any;

  constructor(
    private service: ServiceApplicationService,
    private router: Router,
    private serProfile: ServProfileService
  ) {}

  ngOnInit() {
    /* let timer = JSON.parse(localStorage.getItem("token"));
    console.log("time : ", timer.JSON());
    if (timer && Date.now() > timer) {
      console.log("la date inferieur : ", timer && Date.now() > timer);

      this.service.logoutProfile();
      this.router.navigate(["/login"]);
    } */
    this.serProfile
      .getProfile(this.service.usernameConnected)
      .subscribe(item => {
        this.userData = item;
        console.log(
          "dans plateformComponent : ",
          this.service.usernameConnected
        );
        console.log("le user name : ", this.userData.name);
      });
  }
}

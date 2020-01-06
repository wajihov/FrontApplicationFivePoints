import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "../service/service-application.service";
import { Router } from "@angular/router";
import { ServProfileService } from "../service/profile/serv-profile.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  userData: any;

  constructor(
    private servive: ServiceApplicationService,
    private router: Router,
    private serProfile: ServProfileService
  ) {}

  ngOnInit() {
    this.serProfile
      .getProfile(this.servive.usernameConnected)
      .subscribe(data => {
        this.userData = data;
        console.log("le nom est : ", this.userData.name);
        
      });
  }

  logout() {
    this.servive.logoutProfile();
  }
}

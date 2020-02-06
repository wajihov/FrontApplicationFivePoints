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
  imgProfile: any;
  url = "http://localhost:8080/api/image/getPhoto";

  constructor(
    public service: ServiceApplicationService,
    private router: Router,
    private serProfile: ServProfileService
  ) {}

  ngOnInit() {
    this.serProfile
      .getProfile(this.service.usernameConnected)
      .subscribe(data => {
        console.log("le username est : ", this.service.usernameConnected);
        this.userData = data;
        this.serProfile.idUserConnected = this.userData.id;
        //console.log("le nom est : ", this.userData.name);
        //console.log("the gender is : ", this.userData.images);
        //src="{{url+ '/' +item?.id}}"
        this.imgProfile = this.url + "/" + this.userData.id;

        /* if (this.userData.gender == "Male")
          this.imgProfile = "assets/image_profile/homme.png";
        else if ((this.userData.gender = "Femele"))
          this.imgProfile = "assets/image_profile/femme.png"; */
      });
  }

  logout() {
    this.service.logoutProfile();
  }
}

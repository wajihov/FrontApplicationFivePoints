import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "../service/service-application.service";
import { Router } from "@angular/router";
import { ServProfileService } from "../service/profile/serv-profile.service";
import { element } from "protractor";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  userData: any;
  imgProfile: any;
  url = "http://localhost:8080/api/image/getPhoto";
  listIdTo: any = [];

  constructor(
    public service: ServiceApplicationService,
    private router: Router,
    private serProfile: ServProfileService
  ) {}

  ngOnInit() {
    this.serProfile
      .getProfile(this.service.usernameConnected)
      .subscribe(data => {
        //console.log("le username est : ", this.service.usernameConnected);
        this.userData = data;
        this.serProfile.idUserConnected = this.userData.id;
        this.imgProfile = this.url + "/" + this.userData.id;
        //console.log("users : ", this.userData);
        this.serProfile.getAllMatching().subscribe((response: any) => {
          this.listIdTo = response;
          //console.log(this.listIdTo);
          this.listIdTo = this.listIdTo.filter(
            element => element.idFrom.id === this.userData.id
          );
          this.listIdTo = this.listIdTo.filter(
            element => element.state !== "amant"
          );
          console.log(this.listIdTo);
        });
        /* if (this.userData.gender == "Male")
          this.imgProfile = "assets/image_profile/homme.png";
        else if ((this.userData.gender = "Femele"))
          this.imgProfile = "assets/image_profile/femme.png"; */
      });
  }

  accepter(id: number, data: any) {
    console.log("number : ", id, " Data ", data);

    this.serProfile.accepteMatching(id, data).subscribe(
      resp => {
        console.log("Successfully ");
        this.ngOnInit();
      },
      errorrrr => {
        console.log("Erreur : ", errorrrr);
      }
    );
  }

  refuser(id: number) {
    this.serProfile.deleteMatching(id).subscribe(
      resp => {
        console.log("Delete Succufelly");
      },
      err => {
        console.log("error : ", err);
      }
    );
    this.ngOnInit();
  }

  logout() {
    this.service.logoutProfile();
  }
}

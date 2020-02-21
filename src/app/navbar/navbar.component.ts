import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "../service/service-application.service";
import { Router } from "@angular/router";
import { ServProfileService } from "../service/profile/serv-profile.service";
import { element } from "protractor";
import { Location } from "@angular/common";

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
  listAmisAttente: any = [];

  constructor(
    public service: ServiceApplicationService,
    private router: Router,
    private location: Location,
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

        this.serProfile.getlistSent(this.userData.id).subscribe((resp: any) => {
          this.listIdTo = resp;
          console.log("listidTo ", this.listIdTo);
        });
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
    location.reload();
  }

  refuser(id: number) {
    console.log("refuser id ", id);
    this.serProfile.deleteMatching(id).subscribe(
      resp => {
        console.log("Delete Succufelly");
        this.ngOnInit();
      },
      err => {
        console.log("error : ", err);
      }
    );
    location.reload();
  }

  logout() {
    this.service.logoutProfile();
  }
}

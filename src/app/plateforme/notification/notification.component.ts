import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { Router } from "@angular/router";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit {
  userData: any;
  imgProfile: any;
  url = "http://localhost:8080/api/image/getPhoto";
  listIdTo: any = [];
  listIdFrom: any = [];
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
        this.serProfile
          .getListMatchedUserById(this.userData.id)
          .subscribe((response: any) => {
            this.listIdFrom = response;
            console.log("listFrom : ", this.listIdFrom);
          });
      });
  }

  retirer(id: number) {
    console.log("retirer : ", id);
    this.serProfile.deleteMatching(id).subscribe(
      resp => {
        console.log("Delete Succufelly");
        this.ngOnInit();
      },
      err => {
        console.log("error : ", err);
      }
    );
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
}

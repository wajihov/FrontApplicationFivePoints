import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import * as moment from "moment";
import Swal from "sweetalert2";

@Component({
  selector: "app-friend",
  templateUrl: "./friend.component.html",
  styleUrls: ["./friend.component.scss"]
})
export class FriendComponent implements OnInit {
  userData: any;
  listAmis: any = [];
  listNameImages: any;
  url = "http://localhost:8080/api/image/getPhoto";
  msg: any;

  constructor(
    private serviceProfile: ServProfileService,
    private service: ServiceApplicationService
  ) {}

  ngOnInit() {
    console.log("connected : ", this.service.usernameConnected);
    this.serviceProfile.getProfile(this.service.usernameConnected).subscribe(
      data => {
        this.userData = data;
        this.listNameImages = this.userData.images;
        this.serviceProfile
          .getListAmis(this.userData.id)
          .subscribe(response => {
            this.listAmis = response;
            console.log(this.listAmis);
          });
      },
      err => {
        console.log("Error display image : ", err);
      }
    );
  }

  deleteAmant(idSelect) {
    console.log("l'id select est : ", idSelect);
    this.serviceProfile
      .getProfile(this.service.usernameConnected)
      .subscribe(data => {
        this.userData = data;
        console.log("id User est : ", this.userData.id);
        Swal.fire({
          title: "DELETE",
          text: "Are you sure to delete this amant?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.value) {
            this.serviceProfile
              .deleteAmant(idSelect, this.userData.id)
              .subscribe(res => {
                this.msg = res;
                Swal.fire(
                  "Deleted!",
                  /* 'Your file has been deleted.' */
                  this.msg,
                  "success"
                );
                console.log("le message est : ", this.msg);
                this.ngOnInit();
              });
          }
        });
      });
  }
  public ageFromBirthdate(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, "years");
  }
}

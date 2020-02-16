import { Component, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { FiltreCreteriaPipe } from "./../../pipe/filtre-creteria.pipe";
import * as moment from "moment";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { element } from "protractor";

@Component({
  selector: "app-creteria",
  templateUrl: "./creteria.component.html",
  styleUrls: ["./creteria.component.scss"]
})
export class CreteriaComponent implements OnInit {
  listUsers: any = [];
  listAmant: any = [];
  filteredListUsers: any = [];
  listSentMatching: any = [];
  checkedList: any = [];
  searchJson = { eyesColor: [] };
  getUser: any;
  formMatching: any;
  listDisabled: any = [];
  listUserMatched: any = [];

  url = "http://localhost:8080/api/image/getPhoto";

  constructor(
    private service: ServProfileService,
    private serviceProfile: ServiceApplicationService
  ) {}

  ngOnInit() {
    this.service.getAllUserMale().subscribe(response => {
      this.listUsers = response;
      this.service.getAllFemele().subscribe(response2 => {
        // this.listUsers.concat(response2);
        let list: any = [];
        list = response2;
        this.listUsers.splice(this.listUsers.length - 1, 0, ...list);
        this.filteredListUsers = this.listUsers;

        this.service
          .getProfile(this.serviceProfile.usernameConnected)
          .subscribe(data => {
            this.getUser = data;
            this.filteredListUsers = this.filteredListUsers.filter(
              element => element.id !== this.getUser.id
            );
            //tt les users ss conncted
            this.service.getListAmis(this.getUser.id).subscribe(res => {
              this.listAmant = res;
              console.log("list amis : ", this.listAmant);
              for (let i = 0; i < this.filteredListUsers.length; i++) {
                for (let j = 0; j < this.listAmant.length; j++) {
                  if (this.filteredListUsers[i].id === this.listAmant[j].id) {
                    this.filteredListUsers.splice(i, 1);
                  }
                }
              }
              console.log("ss amis ", this.filteredListUsers);
              //liste que l'user matching

              this.service
                .getlistMatched(this.getUser.id)
                .subscribe((res: any) => {
                  this.listDisabled = res;
                  console.log(this.listDisabled);
                  for (let k = 0; k < this.filteredListUsers.length; k++) {
                    for (let l = 0; l < this.listDisabled.length; l++) {
                      if (
                        this.filteredListUsers[k].id === this.listDisabled[l].id
                      ) {
                        this.filteredListUsers.splice(k, 1);
                      }
                    }
                  }
                  console.log(this.filteredListUsers);
                  //liste user matched
                  this.service
                    .getListMatchedUser(this.getUser.id)
                    .subscribe((resp2: any) => {
                      this.listUserMatched = resp2;
                      for (let f = 0; f < this.filteredListUsers.length; f++) {
                        for (let g = 0; g < this.listUserMatched.length; g++) {
                          if (
                            this.filteredListUsers[f].id ===
                            this.listUserMatched[g].id
                          ) {
                            //this.filteredListUsers.splice(f, 1);
                            console.log(this.filteredListUsers[f].id);
                            this.filteredListUsers[f].etat = true;
                          }
                        }
                      }
                      console.log(this.filteredListUsers);
                    });
                });

              /* this.service.getlistSent(this.getUser.id).subscribe(resp => {
                this.listSentMatching = resp;
                console.log("matching : ", this.listSentMatching);
                for (let i = 0; i < this.filteredListUsers.length; i++) {
                  this.filteredListUsers[i].etat = true;
                }
                for (let i = 0; i < this.filteredListUsers.length; i++) {
                  for (let j = 0; j < this.listSentMatching.length; j++) {
                    if (
                      this.listSentMatching[j].id ===
                      this.filteredListUsers[i].id
                    ) {
                      this.filteredListUsers[i].etat = false;
                    }
                  }
                }
              }); */
              console.log("listProfiles 2 ", this.filteredListUsers);
            });
          });
      });
    });
  }

  selectValue(value) {
    if (this.checkedList.includes(value)) {
      const i = this.checkedList.indexOf(value);
      this.checkedList.splice(i, 1);
    } else {
      this.checkedList.push(value);
    }
    if (this.checkedList.length > 0) {
      this.filteredListUsers = this.listUsers.filter(obj => {
        return this.checkedList.includes(obj.gender);
      });
    } else {
      this.filteredListUsers = this.listUsers;
    }
  }

  onChange(value) {
    this.selectValue(value);
  }

  onSelectColorHair(value) {
    if (this.checkedList.includes(value)) {
      const i = this.checkedList.indexOf(value);
      this.checkedList.splice(i, 1);
    } else {
      this.checkedList.push(value);
    }
    if (this.checkedList.length > 0) {
      this.filteredListUsers = this.listUsers.filter(obj => {
        return this.checkedList.includes(obj.hairColor);
      });
    } else {
      this.filteredListUsers = this.listUsers;
    }
  }

  public ageFromBirthdate(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, "years");
  }

  addToFilter(filterValue) {
    // this.filteredProducts = this.products;
    let arrayCol: any[] = <Array<any>>this.searchJson["eyesColor"];
    if (arrayCol.includes(filterValue)) {
      this.searchJson["eyesColor"] = this.searchJson["eyesColor"].filter(
        elem => elem !== filterValue
      );
    } else {
      this.searchJson["eyesColor"].push(filterValue);
    }
    if (arrayCol.length !== 0) {
      // this.searchJson["eyesColor"] = arrayCol;
      const p = new FiltreCreteriaPipe();
      this.filteredListUsers = p.transform(this.listUsers, this.searchJson);
      //console.log("filterListUserS ", this.filteredListUsers);
    } else {
      this.filteredListUsers = this.listUsers;
    }
    
  }
  following(i: number) {
    this.service
      .getProfile(this.serviceProfile.usernameConnected)
      .subscribe((item: any) => {
        this.getUser = item;
        this.formMatching = {
          idFrom: this.getUser.id,
          idTo: i
        };
        this.service
          .postMatching(this.formMatching)
          .subscribe(data => console.log("Post was done successsfully"));
        this.ngOnInit();
      });
  }
}

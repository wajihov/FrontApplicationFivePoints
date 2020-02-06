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
  listUsers: any;
  filteredListUsers: any;
  checkedList: any[];
  searchJson = { eyesColor: [] };
  getUser: any;
  url = "http://localhost:8080/api/image/getPhoto";

  constructor(
    private service: ServProfileService,
    private serviceProfile: ServiceApplicationService
  ) {}

  ngOnInit() {
    this.checkedList = [];
    this.listUsers = [];
    this.filteredListUsers = [];
    this.service.getAllUserMale().subscribe(response => {
      this.listUsers = response;
      this.service.getAllFemele().subscribe(response2 => {
        // this.listUsers.concat(response2);
        let list: any = [];
        list = response2;
        this.listUsers.splice(this.listUsers.length - 1, 0, ...list);
        this.filteredListUsers = this.listUsers;

        //this.filteredListUsers= this.filteredListUsers.filter(element=>)
        this.service
          .getProfile(this.serviceProfile.usernameConnected)
          .subscribe(data => {
            this.getUser = data;
            this.filteredListUsers = this.filteredListUsers.filter(
              element => element.id !== this.getUser.id
            );
          });
        console.log(this.filteredListUsers);
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
    console.log("hair : ", value);
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
      console.log("filterListUserS ", this.filteredListUsers);
    } else {
      this.filteredListUsers = this.listUsers;
    }
  }
}

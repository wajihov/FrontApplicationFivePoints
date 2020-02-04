import { Component, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { FiltreCreteriaPipe } from "./../../pipe/filtre-creteria.pipe";
import * as moment from "moment";

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
  url = "http://localhost:8080/api/image/getPhoto";

  constructor(private service: ServProfileService) {}

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
    this.selectValue(value);
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
      console.log("arrayCol " + arrayCol);
      console.log("Search Json :", this.searchJson);

      // this.searchJson["eyesColor"] = arrayCol;
      const p = new FiltreCreteriaPipe();
      this.filteredListUsers = p.transform(this.listUsers, this.searchJson);
    } else {
      this.filteredListUsers = this.listUsers;
    }
  }
}

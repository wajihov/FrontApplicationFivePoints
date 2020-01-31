import { Component, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import * as moment from "moment";

@Component({
  selector: "app-creteria",
  templateUrl: "./creteria.component.html",
  styleUrls: ["./creteria.component.scss"]
})
export class CreteriaComponent implements OnInit {
  listUsers: any = null;
  listUserMale: any = null;
  listUserFemele: any = null;
  public valueToken: string;
  url = "http://localhost:8080/api/image/getPhoto";
  constructor(private service: ServProfileService) {}

  ngOnInit() {
    this.valueToken = null;

    this.service.getAllUserMale().subscribe(response => {
      this.listUserMale = response;
    });

    this.service.getAllFemele().subscribe(response => {
      this.listUserFemele = response;
    });
  }

  onChange(event, value) {
        /* if(event.checked == true && value == "Male"){
      this.listUsers = this.listUserMale;
    }
    else if(event.checked == true && value == "Femele"){
      this.listUsers = this.listUserFemele;
    } */
    if (event.checked == true && value == "Male" && !this.valueToken) {
      this.valueToken = value;
      this.listUsers = this.listUserMale;
      console.log("true-Male Token-null 1", this.listUsers);
      
    } else if (event.checked == true && value == "Femele" && !this.valueToken) {
      this.valueToken = value;
      this.listUsers = this.listUserFemele;
      console.log("true-Femele Token-null 2", this.listUsers);
    } else if (event.checked == true && this.valueToken) {
      if (this.valueToken == "Male") {
        this.listUserFemele.forEach((f: any) => {
          this.listUsers.push(f);
        });
        console.log("true Token-Male 3", this.listUsers);
      }
      if (this.valueToken == "Femele") {
        this.listUserMale.forEach((m: any) => {
          this.listUsers.push(m);
        });
        console.log("true Token-Femele 4", this.listUsers);
      }
    } else {
      if (!event.checked && value == "Male") {
        this.listUsers = this.listUserFemele;
        this.valueToken = "Femele";
        console.log("false Token-Male 5", this.listUsers);
      }
      if (!event.checked && value == "Femele") {
        this.listUsers = this.listUserMale;
        this.valueToken = "Male";
        console.log("false Token-Femele 6", this.listUsers);
      }
     
    }
    console.log("checked ", event.checked, "Value ", value);
  }

  public ageFromBirthdate(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, "years");
  }
}

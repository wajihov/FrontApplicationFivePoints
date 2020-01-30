import { Component, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material";

@Component({
  selector: "app-creteria",
  templateUrl: "./creteria.component.html",
  styleUrls: ["./creteria.component.scss"]
})
export class CreteriaComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  onChange(event, value) {
    console.log("Gender : ", event.checked, " value ", value);
  }
}

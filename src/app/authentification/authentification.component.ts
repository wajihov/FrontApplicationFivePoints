import { Component, OnInit } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ServiceApplicationService } from "../service/service-application.service";
import "hammerjs";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-authentification",
  templateUrl: "./authentification.component.html",
  styleUrls: ["./authentification.component.scss"]
})
export class AuthentificationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

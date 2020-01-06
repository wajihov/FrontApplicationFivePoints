import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "../service/service-application.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private servive: ServiceApplicationService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.servive.logoutProfile();
  }
}

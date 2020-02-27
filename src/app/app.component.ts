import { Component } from "@angular/core";
import { ServiceApplicationService } from "./service/service-application.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "FrontSecurity";
  constructor(
    private service: ServiceApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }
}

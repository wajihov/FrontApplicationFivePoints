import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from 'src/app/service/service-application.service';
import { Router } from '@angular/router';
import { ServProfileService } from 'src/app/service/profile/serv-profile.service';

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
  constructor(
    public service: ServiceApplicationService,
    private router: Router,
    private serProfile: ServProfileService
  ) {}

  ngOnInit() {}
}

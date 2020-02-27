import { Component, OnInit } from "@angular/core";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import "rxjs/add/operator/map";
//import { map } from "rxjs/operators";

@Component({
  selector: "app-display-string",
  templateUrl: "./display-string.component.html",
  styleUrls: ["./display-string.component.scss"]
})
export class DisplayStringComponent implements OnInit {
  data: any;
  constructor(private service: ServProfileService) {}

  ngOnInit() {
    this.service.getString().subscribe(res => {
      this.data = res;
      console.log("Datataaaaaaaaaaaaaaa ", this.data);
    });
  }
}

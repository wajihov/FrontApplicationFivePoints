import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { HttpClient } from "@angular/common/http";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public userFile: any = File;

  constructor(private service: ServProfileService, private http: HttpClient) {}

  ngOnInit() {}

  onSelectFile(event) {
    const file = event.target.files[0];
    console.log("image [@]: ", file);
    this.userFile = file;
    const formData = new FormData();
    formData.append("file", this.userFile, this.userFile.name);
    this.service.saveImage(formData).subscribe(data => {
      console.log("data : image ", data);
    });
  }
}

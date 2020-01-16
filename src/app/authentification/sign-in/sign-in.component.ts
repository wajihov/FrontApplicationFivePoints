import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  formAuth: FormGroup;
  mode: Boolean = false;
  constructor(
    private serviceApp: ServiceApplicationService,
    private router: Router,
    private goToProfile: ServProfileService
  ) {}

  ngOnInit() {
    this.formAuth = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });
  }
  onConnect() {
    //authentif: any
    this.serviceApp.postSignIn(this.formAuth.value).subscribe(
      (data: any) => {
        console.log("hello dans onconnect : ", data);
        console.log("le token : ", data.accessToken);
        localStorage.setItem("token", data.accessToken);
        this.router.navigate(["/plateforme/profile"]);
        console.log("username : ", data.sub);
        console.log("usernameConnected : ", this.serviceApp.usernameConnected);
        //  localhost:8080/api/users/getUser/this.serviceApp.usernameConnected
        console.log(
          "le lien est : ",
          " localhost:8080/api/users/getUser/" +
            this.serviceApp.usernameConnected
        );
        
        this.goToProfile.getProfile(this.serviceApp.usernameConnected);
      },
      errrr => {
        console.log("erreooor : ", errrr);
        this.mode = true;
      }
    );
  }
  getMsgErrorConnect() {
    return "Invalid username or password";
  }
}

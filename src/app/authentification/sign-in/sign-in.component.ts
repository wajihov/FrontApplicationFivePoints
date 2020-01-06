import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

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
    private router: Router
  ) {}

  ngOnInit() {
    this.formAuth = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });
  }
  onConnect(authentif: any) {
    this.serviceApp.postSignIn(this.formAuth.value).subscribe(
      (data: any) => {
        console.log("le token : ", data.accessToken);
        localStorage.setItem("token", data.accessToken);
        this.router.navigate(["/plateforme/profile"]);
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

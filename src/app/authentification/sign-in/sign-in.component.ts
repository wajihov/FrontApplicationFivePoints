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
  userData: any;
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
      data => {
        this.userData = data;
        console.log("les donnees : ", data);
        this.router.navigate(["profile"]);
      },
      errrr => {
        this.mode = true;
        console.log("errrrrror : ", errrr);
      }
    );
  }
  getMsgErrorConnect() {
    return "Invalid username or password";
  }
}

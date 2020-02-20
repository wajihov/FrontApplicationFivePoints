import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  formForgetPassword: FormGroup;

  constructor(
    private serviceApp: ServiceApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formForgetPassword = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  onBlurEmail() {
    this.serviceApp.postEmail(this.formForgetPassword.value).subscribe(
      data => {
        console.log("data : ", data);
        if (data == false) {
          this.formForgetPassword.get("email").setErrors({ invalid: true });
        } else {
          console.log("mail existe deja ds BD");
        }
      },
      errr => {
        console.log(errr);
      }
    );
  }
  onResetPW() {
    console.log(this.formForgetPassword.value);
    this.serviceApp.postMail(this.formForgetPassword.value).subscribe(data => {
      const options = { responseType: "text" };
      console.log(options);
      console.log("Data ", data);
      this.router.navigate(["/"]);
    });
  }

  getErrorMessageEmail() {
    console.log(this.formForgetPassword.get("email").hasError("required"));

    return this.formForgetPassword.get("email").hasError("required")
      ? "You must enter a value"
      : this.formForgetPassword.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
  mailNotExist() {
    if (
      this.formForgetPassword.get("email").value.length != 0 &&
      !this.formForgetPassword.get("email").hasError("email")
    ) {
      return this.formForgetPassword.get("email") ? "Email is not exist !" : "";
    } else return "";
  }
}

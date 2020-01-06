import { Component, OnInit } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  formRegister: FormGroup;
  genders: any = ["Male", "Femele"];
  eyesColors: any = ["Blue", "Brown", "Green"];
  hairColors: any = ["Black", "Blond", "White", "Blue"];
  userData: any;

  constructor(
    private serviceApp: ServiceApplicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formRegister = new FormGroup({
      name: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      birthdate: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      eyesColor: new FormControl("", [Validators.required]),
      hairColor: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  onChange(value: any) {
    console.log(value);
  }
  onRegister() {
    console.log("les donnes sont : ", this.formRegister.value);
    /* console.warn(this.formRegister.controls["username"].value);
    console.log(this.formRegister.get("username").value); */
    this.register();
    this.router.navigate(["signIn"]);
  }

  register() {
    this.serviceApp.postSignUp(this.formRegister.value).subscribe(
      data => {
        this.userData = data;
        console.log("les donnesssss : ", data);
      },
      errrr => {
        console.log("errrrrror : ", errrr);
      }
    );
  }

  onBlurMethodUsername() {
    this.serviceApp.postUsername(this.formRegister.value).subscribe(
      data => {
        if (data == true) {
          this.formRegister.get("username").setErrors({ invalid: true });
        }
      },
      errr => {
        console.log(errr);
      }
    );
  }

  onBlurEmail() {
    this.serviceApp.postEmail(this.formRegister.value).subscribe(
      data => {
        if (data == true) {
          this.formRegister.get("email").setErrors({ invalid: true });
        }
      },
      errr => {
        console.log(errr);
      }
    );
  }

  getErrorMessageEmail() {
    return this.formRegister.get("email").hasError("required")
      ? "You must enter a value"
      : this.formRegister.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
  mailExist() {
    if (this.formRegister.get("email").value.length != 0) {
      return this.formRegister.get("email") ? "Email is already in use!" : "";
    } else return "";
  }

  getUsername() {
    return this.formRegister.get("username").hasError("required")
      ? "You must enter a value of Username"
      : "";
  }

  usernameExist() {
    if (this.formRegister.get("username").value.length != 0) {
      return this.formRegister.get("username")
        ? "Username is already taken!"
        : "";
    } else return "";
  }

  getName() {
    return this.formRegister.get("name").hasError("required")
      ? "You must enter a value of Full Name"
      : "";
  }
  
  getPassword() {
    return this.formRegister.get("password").hasError("required")
      ? "You must enter a value of your password"
      : "";
  }
}

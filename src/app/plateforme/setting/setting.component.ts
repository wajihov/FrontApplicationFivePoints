import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ServProfileService } from "src/app/service/profile/serv-profile.service";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"]
})
export class SettingComponent implements OnInit {
  userData: any;
  eyesColors: any = ["Blue", "Brown", "Green"];
  hairColors: any = ["Black", "Blond", "White", "Blue"];

  formModify: any;
  formToken: any;
  personalForm: FormGroup;
  personalCaracter: FormGroup;
  otherForm: FormGroup;
  confirmForm: FormGroup;
  modifyUsername: Boolean = true;
  modifyEmail: Boolean = true;
  yourpassword: Boolean = true;
  idUser: any;
  updateForm: any;
  profileForm: any;

  constructor(
    private serProfile: ServProfileService,
    private service: ServiceApplicationService,
    private router: Router
  ) {
    this.personalForm = new FormGroup({
      name: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required)
    });
    this.personalCaracter = new FormGroup({
      eyesColor: new FormControl("", Validators.required),
      hairColor: new FormControl("", Validators.required)
    });
    this.otherForm = new FormGroup({
      description: new FormControl(""),
      birthdate: new FormControl("")
    });
    this.confirmForm = new FormGroup({
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.serProfile
      .getProfile(this.service.usernameConnected)
      .subscribe(data => {
        this.userData = data;
        this.idUser = this.userData.id;
        console.log("l id user : ", this.idUser);
        this.personalForm = new FormGroup({
          name: new FormControl(this.userData.name, Validators.required),
          username: new FormControl(
            this.userData.username,
            Validators.required
          ),
          email: new FormControl(this.userData.email, Validators.required)
        });
        this.personalCaracter = new FormGroup({
          eyesColor: new FormControl(
            this.userData.eyesColor,
            Validators.required
          ),
          hairColor: new FormControl(
            this.userData.hairColor,
            Validators.required
          ),
          gender: new FormControl(this.userData.gender, Validators.required)
        });
        this.otherForm = new FormGroup({
          birthdate: new FormControl(this.userData.birthdate),
          description: new FormControl(this.userData.description)
        });
      });
  }

  AddForm() {
    this.formModify = {
      //"id": this.idUser,
      ...this.personalForm.value,
      ...this.personalCaracter.value,
      ...this.otherForm.value,
      ...this.confirmForm.value
    };
    console.log(
      this.modifyUsername,
      " ",
      this.modifyEmail,
      " ",
      this.yourpassword
    );

    if (
      this.modifyUsername == true &&
      this.modifyEmail == true &&
      this.yourpassword == true
    ) {
      this.serProfile
        .updateAccount(this.idUser, this.personalForm.value)
        .subscribe((data: any) => {
          data["id"] = this.idUser;
          const username = this.personalForm.controls["username"].value;
          this.updateForm = { username, ...this.confirmForm.value };
          this.service.postSignIn(this.updateForm).subscribe((item: any) => {
            localStorage.setItem("token", item.accessToken);
            this.router.navigate(["/plateforme/profile"]);
          });
          this.service.usernameConnected = this.personalForm.controls[
            "username"
          ].value;
        });

      this.profileForm = {
        ...this.personalCaracter.value,
        ...this.otherForm.value
      };
      this.serProfile
        .updateProfile(this.idUser, this.profileForm)
        .subscribe((data: any) => {
          console.log("le profile : ", data);
          console.log(this.profileForm, " ", this.idUser);
        });
    }
  }

  KeyUpPassword() {
    const obj = { id: this.idUser, ...this.confirmForm.value };
    this.serProfile.resultComparePassword(obj).subscribe(data => {
      if (data == false) {
        this.yourpassword = false;
        this.confirmForm.get("password").setErrors({ invalid: true });
      } else {
        this.yourpassword = true;
      }
    });
  }

  onBlurMethodUsername() {
    this.serProfile.getIdUsername(this.personalForm.value).subscribe(
      data => {
        if (data != 0 && this.userData.id != data) {
          this.modifyUsername = false;
          this.personalForm.get("username").setErrors({ invalid: true });
          //console.log("username existe");
        } else {
          this.modifyUsername = true;
          console.log("Username valid");
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getUsername() {
    return this.personalForm.get("username").hasError("required")
      ? "You must enter a value of Username"
      : "";
  }

  getPassword() {
    return this.confirmForm.get("password").hasError("required")
      ? "You must enter a value of your password"
      : "";
  }

  getNotExistPassword() {
    if (this.confirmForm.get("password").value.length != 0) {
      return this.confirmForm.get("password") ? "Incorect password" : "";
    } else return "";
  }

  usernameExist() {
    if (this.personalForm.get("username").value.length != 0) {
      return this.personalForm.get("username")
        ? "Username is already taken!"
        : "";
    } else return "";
  }

  onBlurEmail() {
    this.serProfile.getIdEmail(this.personalForm.value).subscribe(
      data => {
        if (data == 0 || this.userData.id == data) {
          this.modifyEmail = true;
          console.log("Email valid");
        } else {
          this.modifyEmail = false;
          this.personalForm.get("email").setErrors({ invalid: true });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getErrorMessageEmail() {
    return this.personalForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.personalForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
  mailExist() {
    if (this.personalForm.get("email").value.length != 0) {
      return this.personalForm.get("email") ? "Email is already in use!" : "";
    } else return "";
  }
}

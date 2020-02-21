import { Component, OnInit } from "@angular/core";
import { ServiceApplicationService } from "src/app/service/service-application.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  constructor(
    private service: ServiceApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetPassword = new FormGroup(
      {
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10)
        ]),
        repeatPassword: new FormControl("", [Validators.required])
      },
      {
        validators: this.passwordsShouldMatch.bind(this)
      }
    );
  }

  private passwordsShouldMatch(group: FormGroup): { mismatch: boolean } {
    if (group.get("password").value === group.get("repeatPassword").value) {
      return null;
    } else {
      group.controls.repeatPassword.setErrors({ invalid: true });
      return { mismatch: true };
    }
  }
  onRecoverPW() {
    Swal.fire({
      title: "Custom width, padding, background.",
      width: 600,
      padding: "3em",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
    const id = this.route.snapshot.params["id"];
    this.service.GetPageResetPassword(id).subscribe(data => {
      console.log("id : ", id, " data ", data);
      console.log(this.resetPassword.value);
      const updatePassword: FormGroup = new FormGroup({
        password: new FormControl(this.resetPassword.value.password)
      });
      console.log(updatePassword.value, " ", id);

      this.service
        .putNewPassword(id, updatePassword.value)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(["/"]);
        });
    });
  }
}

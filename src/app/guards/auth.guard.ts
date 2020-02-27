import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { ServiceApplicationService } from "../service/service-application.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: ServiceApplicationService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("token") !== "null" &&
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== "undefined"
    ) {
      console.log("dans guard : ", localStorage.getItem("token"));
      return true;
    } else {
      this.router.navigateByUrl("/auth/signIn");
      this.service.logoutProfile();
      return false;
    }
  }
}

import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
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
      return false;
    }
  }
}
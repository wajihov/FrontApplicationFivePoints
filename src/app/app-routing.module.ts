import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthentificationComponent } from "./authentification/authentification.component";
import { SignInComponent } from "./authentification/sign-in/sign-in.component";
import { SignUpComponent } from "./authentification/sign-up/sign-up.component";
import { ProfileComponent } from "./Session/profile/profile.component";

const routes: Routes = [
  { path: "register", component: AuthentificationComponent },
  { path: "", component: SignInComponent }, 
  { path: "signIn", component: SignInComponent },
  { path: "signUp", component: SignUpComponent },
  { path: "profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

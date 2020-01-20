import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthentificationComponent } from "./authentification/authentification.component";
import { SignInComponent } from "./authentification/sign-in/sign-in.component";
import { SignUpComponent } from "./authentification/sign-up/sign-up.component";
import { ProfileComponent } from "./plateforme/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { PlateformeComponent } from "./plateforme/plateforme.component";
import { SettingComponent } from "./plateforme/setting/setting.component";
import { ProfilesComponent } from './plateforme/profiles/profiles.component';

const routes: Routes = [
  {
    path: "auth",
    component: AuthentificationComponent,
    children: [
      { path: "signIn", component: SignInComponent },
      { path: "signUp", component: SignUpComponent },
      { path: "", redirectTo: "signIn", pathMatch: "full" }
      // { path: "", component: SignInComponent },
    ]
  },

  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "plateforme",
    component: PlateformeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "profile", component: ProfileComponent },
      { path: "setting", component: SettingComponent },
      { path: "profiles", component: ProfilesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

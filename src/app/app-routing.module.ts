import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthentificationComponent } from "./authentification/authentification.component";
import { SignInComponent } from "./authentification/sign-in/sign-in.component";
import { SignUpComponent } from "./authentification/sign-up/sign-up.component";
import { ProfileComponent } from "./plateforme/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { PlateformeComponent } from "./plateforme/plateforme.component";
import { SettingComponent } from "./plateforme/setting/setting.component";
import { ProfilesComponent } from "./plateforme/profiles/profiles.component";
import { UserProfileComponent } from "./plateforme/user-profile/user-profile.component";
import { CreteriaComponent } from "./plateforme/creteria/creteria.component";
import { NotificationComponent } from "./plateforme/notification/notification.component";
import { FriendComponent } from "./plateforme/friend/friend.component";
import { MessageComponent } from "./plateforme/message/message.component";
import { MessagesComponent } from "./plateforme/messages/messages.component";
import { ForgetPasswordComponent } from "./authentification/forget-password/forget-password.component";
import { ResetPasswordComponent } from "./authentification/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: "auth",
    component: AuthentificationComponent,
    children: [
      { path: "signIn", component: SignInComponent },
      { path: "signUp", component: SignUpComponent },
      { path: "forget-password", component: ForgetPasswordComponent },
      { path: "reset-password/:id", component: ResetPasswordComponent },
      { path: "", redirectTo: "signIn", pathMatch: "full" }
      //{ path: "", component: SignInComponent }
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
      { path: "profiles", component: ProfilesComponent },
      { path: "user-profile/:id", component: UserProfileComponent },
      { path: "creteria", component: CreteriaComponent },
      { path: "notification", component: NotificationComponent },
      { path: "friend", component: FriendComponent },
      { path: "message", component: MessageComponent },
      { path: "messages", component: MessagesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

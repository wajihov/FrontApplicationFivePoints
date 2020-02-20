import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthentificationComponent } from "./authentification/authentification.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatStepperModule,
  MatIconModule
} from "@angular/material";
import { SignInComponent } from "./authentification/sign-in/sign-in.component";
import { SignUpComponent } from "./authentification/sign-up/sign-up.component";
import { ProfileComponent } from "./plateforme/profile/profile.component";
import { PlateformeComponent } from "./plateforme/plateforme.component";
import { SettingComponent } from "./plateforme/setting/setting.component";
import { ProfilesComponent } from "./plateforme/profiles/profiles.component";
import { UserProfileComponent } from "./plateforme/user-profile/user-profile.component";
import { CreteriaComponent } from "./plateforme/creteria/creteria.component";
import { FiltreCreteriaPipe } from "./pipe/filtre-creteria.pipe";
import { NotificationComponent } from "./plateforme/notification/notification.component";
import { FriendComponent } from "./plateforme/friend/friend.component";
import { MessageComponent } from "./plateforme/message/message.component";
import { MessagesComponent } from "./plateforme/messages/messages.component";
import { ForgetPasswordComponent } from './authentification/forget-password/forget-password.component';
import { ResetPasswordComponent } from './authentification/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    PlateformeComponent,
    SettingComponent,
    ProfilesComponent,
    UserProfileComponent,
    CreteriaComponent,
    FiltreCreteriaPipe,
    NotificationComponent,
    FriendComponent,
    MessageComponent,
    MessagesComponent,
    ForgetPasswordComponent,    
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatStepperModule,
    NgbModule,
    ScrollDispatchModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

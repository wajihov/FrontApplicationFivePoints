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
import {
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatStepperModule
} from "@angular/material";
import { SignInComponent } from "./authentification/sign-in/sign-in.component";
import { SignUpComponent } from "./authentification/sign-up/sign-up.component";
import { ProfileComponent } from "./plateforme/profile/profile.component";
import { PlateformeComponent } from "./plateforme/plateforme.component";
import { SettingComponent } from "./plateforme/setting/setting.component";
import { ProfilesComponent } from './plateforme/profiles/profiles.component';

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
    ProfilesComponent
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
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

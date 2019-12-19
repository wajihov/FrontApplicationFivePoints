import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthentificationComponent } from "./authentification/authentification.component";

const routes: Routes = [
  { path: "register", component: AuthentificationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

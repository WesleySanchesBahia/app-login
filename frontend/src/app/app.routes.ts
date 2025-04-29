import {  Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:"",
    loadComponent:() => import("./pages/login/login.component").then(c => c.LoginComponent)
  },
  {
    path:"profile",
    loadComponent:() => import("./pages/profile/profile.component").then(c => c.ProfileComponent)
  },
];

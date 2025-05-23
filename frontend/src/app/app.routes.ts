import {  Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path:"",
    loadComponent:() => import("./pages/login/login.component").then(c => c.LoginComponent)
  },
  {
    path:"profile",
    loadComponent:() => import("./pages/profile/profile.component").then(c => c.ProfileComponent),
    canActivate:[authGuard]
  },
];

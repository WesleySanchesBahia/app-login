import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";




export const authGuard:CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');


  if(token){
    return true;
  }

  router.navigate(['/']);
  return false;
}

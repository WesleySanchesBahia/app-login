import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (
  req:HttpRequest<unknown>,
  next:HttpHandlerFn

): Observable<HttpEvent<unknown>> => {

  const token = sessionStorage.getItem("token")
  const router = inject(Router);

  if(token){
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(req).pipe(
    catchError((error:any) => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401){
          sessionStorage.clear();
          router.navigate(['/'])
        }
      }

      return throwError(() => error)
    })
  )
}

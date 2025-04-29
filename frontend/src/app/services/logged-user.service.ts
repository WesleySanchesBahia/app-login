import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { User } from '../../types/User';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  private data$ =  new BehaviorSubject<User | null>(null);
  data!:User | null;
  constructor() {
    this.data$.subscribe(value => this.data = value);
   }


   writeDataUser(user:User):void {
    this.data$.next(user);
   }

}

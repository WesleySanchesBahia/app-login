import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ThemeModeComponent } from "../../components/theme-mode/theme-mode.component";
import { LoggedUserService } from '../../services/logged-user.service';
import { User } from '../../../types/User';
import VanillaTilt from 'vanilla-tilt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ThemeModeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, AfterViewChecked {

  constructor(private user: LoggedUserService, private router:Router){

  }
  profile!:User | null;
  ngOnInit(): void {
  this.profile = this.user.data;
  }


  ngAfterViewChecked(): void {
    let element = document.querySelector(".card") as HTMLElement;

    VanillaTilt.init(element, {
      max:25,
      speed:400,
      glare:true,
      "max-glare":0.4
    })
  }


  logout(): void{
    this.router.navigate(["/"]);
  }

}

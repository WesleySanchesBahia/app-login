import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ThemeModeComponent } from "../../components/theme-mode/theme-mode.component";
import { LoggedUserService } from '../../services/logged-user.service';
import { User } from '../../../types/User';
import VanillaTilt from 'vanilla-tilt';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ThemeModeComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, AfterViewInit {

  constructor(private user: LoggedUserService, private router:Router){

  }
  public profile!:User | null;
  public notFoundImg:boolean = false;
  ngOnInit(): void {
      this.profile = this.user.data || null;
  }


  ngAfterViewInit(): void {
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


  imgError():void {
    this.notFoundImg = true;
  }

}

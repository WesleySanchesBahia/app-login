import { Component, OnInit } from '@angular/core';
import { ThemeModeComponent } from "../../components/theme-mode/theme-mode.component";
import { LoggedUserService } from '../../services/logged-user.service';
import { User } from '../../../types/User';

@Component({
  selector: 'app-profile',
  imports: [ThemeModeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(private user: LoggedUserService){

  }
  profile!:User | null;
  ngOnInit(): void {
  this.profile = this.user.data;
  }
}

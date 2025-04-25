import { Component, OnInit } from '@angular/core';

enum  Mode {
  DARK = "dark",
  LIGHT = "light"
}
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit   {

  constructor(){}
  public mode:Mode = Mode.DARK;
  ngOnInit(): void {
    document.body.classList.toggle(this.mode);
  }


  toggleTheme() {
    if(this.mode == "dark"){
      document.body.classList.toggle(this.mode);
      this.mode = Mode.LIGHT;
    }else {
      this.mode = Mode.DARK;
      document.body.classList.toggle(this.mode);
    }
  }
}

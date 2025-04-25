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
  public mode!:Mode;
  ngOnInit(): void {
    this.mode = Mode.DARK;
    document.body.classList.toggle(this.mode);
  }


  toggleTheme() {
    if(this.mode === Mode.DARK){
      this.mode = Mode.LIGHT;
      this.updateTheme(Mode.DARK);

    }else {
      this.mode = Mode.DARK;
      this.updateTheme(Mode.LIGHT);
    }
  }


  updateTheme(modeTheme:Mode): void {
    document.body.classList.remove(modeTheme);
    document.body.classList.add(this.mode);

  }
}

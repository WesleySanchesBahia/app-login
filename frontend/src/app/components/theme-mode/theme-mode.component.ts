import { Component, OnInit } from '@angular/core';

enum  Mode {
  DARK = "dark",
  LIGHT = "light"
}
@Component({
  selector: 'app-theme-mode',
  imports: [],
  templateUrl: './theme-mode.component.html',
  styleUrl: './theme-mode.component.scss'
})
export class ThemeModeComponent implements OnInit {
  public mode!:Mode;

  ngOnInit(): void {
    if(sessionStorage.getItem("theme")){
      this.mode = sessionStorage.getItem("theme") as Mode;
    }else {
      this.mode = Mode.DARK;
    }
    document.body.classList.add(this.mode);
    sessionStorage.setItem("theme", this.mode);
  }


  toggleTheme(): void {
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
    sessionStorage.setItem("theme", this.mode);
  }

}

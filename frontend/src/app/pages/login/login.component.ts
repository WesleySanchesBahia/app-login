import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

declare const google:any;
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
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private http:HttpClient){}

  public mode!:Mode;
  ngOnInit(): void {
    this.mode = Mode.DARK;
    document.body.classList.toggle(this.mode);

  }
  ngAfterViewInit(): void {
    this.initGoogle();
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

  }


  initGoogle(): void {
    google.accounts.id.initialize({
      client_id: "157346808012-72edm388v2n7od3je06k9s1vh6ndd6hm.apps.googleusercontent.com",
      callback:( response: any) => {
        this.credencialResponse(response);
      }
    })
  }


  loginGoogle(): void{
    google.accounts.id.prompt();
  }

  credencialResponse(response:any): void{
    const { credential } = response;

    this.http.post("http://localhost:3000/api/auth/google", { token: credential }).subscribe({
      next:(reponse) => {
        console.log(reponse);
      },
      error:(error) => {
        console.log("Erro:", error);
      }
    })

  }
}

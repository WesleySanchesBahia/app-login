import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThemeModeComponent } from '../../components/theme-mode/theme-mode.component';
import { User } from '../../../types/User';
import { Router } from '@angular/router';
import { Dialog,  DialogModule } from '@angular/cdk/dialog';
import { InputComponent } from "../../components/input/input.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [ThemeModeComponent, DialogModule, InputComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("templateRegister", { static: true }) template!: TemplateRef<unknown>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: Dialog,
  ) {}

  private url:string = environment.apiUrl;

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.initGoogle();
  }


  initGoogle(): void {
    this.http.get<any>(`${this.url}/secret`).subscribe(({
      next:(res) => {
        const {client_id} = res;
        google.accounts.id.initialize({
          client_id:client_id,
          callback: (response: any) => {
            this.credencialResponse(response);
          },
        });
      },
      error:(error) => {
        console.log("Erro em obter id_client:", error);
      }
    }))

  }

  promptLogin(): void {
    google.accounts.id.prompt();
  }


  credencialResponse(response: any): void {
    const { credential } = response;
    this.http
      .post<{ token:string; user:User}>(
        `${this.url}/auth/google`,
        { credential: credential }
      )
      .subscribe({
        next: (res) => {
          const {token, user} = res;
          this.redirectUser(token, user);
        },
        error: (error) => {
          console.log('Erro em obter as credenciais:', error);
        },
      });
  }

  openDialog(): void {
    this.dialog.open<any>(this.template, {
      minWidth: '300px',
    });
  }


  createUser():void {
    this.http.post<any>(`${this.url}/user/create`, this.form.value).subscribe({
      next:(res) => {
        const {token, user} = res;
        if(token.length){
          this.redirectUser(token, user);
          this.dialog.closeAll();
        }
      },
      error:(error) => {
        console.log("Erro ao criar o usuário:", error)
      }
    })
  }


  private redirectUser(token:string, user:User):void {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user))
    this.router.navigate(["/profile"]);
  }

}

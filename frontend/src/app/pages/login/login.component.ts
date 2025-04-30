import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThemeModeComponent } from '../../components/theme-mode/theme-mode.component';
import { LoggedUserService } from '../../services/logged-user.service';
import { User } from '../../../types/User';
import { Router } from '@angular/router';
import { Dialog, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { InputComponent } from "../../components/input/input.component";

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [ThemeModeComponent, DialogModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("templateRegister", { static: true }) template!: TemplateRef<unknown>;
  constructor(
    private http: HttpClient,
    private loggedUser: LoggedUserService,
    private router: Router,
    private dialog: Dialog,
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initGoogle();
  }


  initGoogle(): void {
    this.http.get<any>("http://localhost:3000/api/secret").subscribe(({
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
        console.log("Erro em obter id_client");
      }
    }))

  }

  loginGoogle(): void {
    google.accounts.id.prompt();
  }

  credencialResponse(response: any): void {
    const { credential } = response;

    this.http
      .post<{ messagem: string; usuario: User }>(
        'http://localhost:3000/api/auth/google',
        { token: credential }
      )
      .subscribe({
        next: (obj) => {
          this.loggedUser.writeDataUser(obj.usuario);
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.log('Erro:', error);
        },
      });
  }

  openDialog() {
    this.dialog.open<any>(this.template, {
      minWidth: '300px',
    });
  }
}

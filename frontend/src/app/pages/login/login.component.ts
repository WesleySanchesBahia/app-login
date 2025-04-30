import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThemeModeComponent } from '../../components/theme-mode/theme-mode.component';
import { LoggedUserService } from '../../services/logged-user.service';
import { User } from '../../../types/User';
import { Router } from '@angular/router';
import { Dialog, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [ThemeModeComponent,DialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("templateRegister", { static: true }) template!: TemplateRef<unknown>;
  constructor(
    private http: HttpClient,
    private loggedUser: LoggedUserService,
    private router: Router,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initGoogle();
  }

  initGoogle(): void {
    google.accounts.id.initialize({
      client_id:
        '157346808012-72edm388v2n7od3je06k9s1vh6ndd6hm.apps.googleusercontent.com',
      callback: (response: any) => {
        this.credencialResponse(response);
      },
    });
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
      panelClass:'',
      autoFocus:false
    });
  }
}

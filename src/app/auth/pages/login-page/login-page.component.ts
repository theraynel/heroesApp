import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  public loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.showSnackBar('Usuario o password incorrecto!');
      return;
    }

    if (this.loginForm.value.email == '' && this.loginForm.value.password == '') {
      this.showSnackBar('Usuario o password incorrecto!');
      return;
    }

    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe((user) => {
        if (user.length) this.router.navigate(['/']);
        else this.showSnackBar('Usuario o password incorrecto!');
      });
  }

  showSnackBar(message: string): void {
    this.snackbar.open(message, 'Error', {
      duration: 2500,
    });
  }
}

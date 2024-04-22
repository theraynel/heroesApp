import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public registerForm = new FormGroup({
    id: new FormControl<number>(0),
    userName: new FormControl<string>('', { nonNullable: true}),
    email: new FormControl<string>('', { nonNullable: true}),
    password: new FormControl<string>('', { nonNullable: true})
  })


  get userRegister(): User {
     const user = this.registerForm.value as User;
     return user;
  }

  constructor(
     private authService: AuthService,
     private router: Router,
     private snackbar: MatSnackBar,
  ){}


  register(){
    if ( this.registerForm.invalid ) return;

    this.authService.register(this.userRegister)
    .subscribe((user) => {
      // TODo: montrar snackbar y navegar a /heroes/edit/ hero.id

      if ( user.id > 0) {
        this.router.navigate( ['/auth/login'])
        this.showSnackBar(`${ user.userName } created!`);
      }
      else
        this.showSnackBar("No se pudo Crear el Usuario");

    });
  }

  showSnackBar( message: string ):void {
    this.snackbar.open( message, 'done', {
     duration: 2500
    });
 }

}

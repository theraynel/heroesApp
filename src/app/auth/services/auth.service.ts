import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User[];

  private userRegister?: User[] = [];

  constructor(private http: HttpClient) { }

  get currentUser():User[]|undefined {
     if( !this.user ) return undefined;

     return structuredClone( this.user );
  }

  get rUser():User[]|undefined {
    if( !this.userRegister ) return undefined;

    return structuredClone( this.userRegister );
 }

  login( email:string, password: string): Observable<User[]> {
   return this.http.get<User[]>(`${ this.baseUrl }/users?q=${email}&&${password}`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'Aafwfrw.fwrfgteg.wgegtgttef' )),
        catchError( err => of() )
      )
  }

  register(user: User): Observable<User> {

     this.validatedEmailExists(user.email)
     .subscribe(
       userRegister => {
        console.log("Super User", userRegister)
       if ( userRegister?.length ) return of("El Email ya existe en la base de Datos!")

      return this.http.post<User>(`${ this.baseUrl }/users`, user);

      }
    );

    //  console.log("userExists", userExists);
    //  console.log("this.userRegister", this.userRegister);
    //  console.log("rUser", this.rUser);


    //  if ( this.userRegister?.length ) throw new Error('')

     return of(user);

  }

  validatedEmailExists(email: string): Observable<User[] | undefined> {
    const url = `${ this.baseUrl }/users?q=${email}`;
    console.log("url",url);
    console.log("email",email);


    return this.http.get<User[]>(`${ this.baseUrl }/users?q=${email}`)
    .pipe(
      tap( user => this.user = user ),
      catchError( err => of([]) )
    )
  }

  checkAuthntication(): Observable<boolean> {
    if ( !localStorage.getItem('token') ) return of(false)

    const token = localStorage.getItem('token');

    return this.http.get<User[]>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError( errr => of(false))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}

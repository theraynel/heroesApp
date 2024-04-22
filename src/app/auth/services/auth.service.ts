import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, pipe, tap } from 'rxjs';

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
      return this.http.post<User>(`${ this.baseUrl }/users`, user)
        .pipe(
          tap( user => user ),
          catchError( err => of() )
        );
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

import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, pipe, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/users?q=${email}&${password}&_limit=1`)
      .pipe(
        tap((user) => (this.user = user[0])),
        tap((user) => {
          if (user.length)
            localStorage.setItem('token',JSON.stringify({
              token: 'Aafwfrw.fwrfgteg.wgegtgttef',
              email: email
            }));
        }),
        catchError((err) => of())
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user).pipe(
      tap((user) => user),
      catchError((err) => of())
    );
  }

  checkAuthntication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = JSON.parse(localStorage.getItem('token')!);

    return this.http.get<User[]>(`${this.baseUrl}/users?q=${token.email}&_limit=1`).pipe(
      tap((user) => (this.user = user[0])),
      map((user) => !!user),
      catchError((errr) => of(false))
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}

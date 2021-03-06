import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(private http: HttpClient) {

    }

    loginUser(userName: string, password: string): Observable<any> {
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        const loginInfo = { username: userName, password: password };
        return this.http.post('/api/login', loginInfo, options)
            .pipe(map(data => <IUser>data['user']))
            .pipe(tap(user => { this.currentUser = user; }))
            .pipe(catchError((error: any) => of(false)));
    }

    updateCurrentUser(firstName: string, lastName: string): Observable<IUser> {
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options)
            .pipe(tap((user: IUser) => { this.currentUser = user; }));
    }

    logoutUser(): Observable<any> {
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post('/api/logout', {}, options)
            .pipe(tap(() => { this.currentUser = null; }));
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity')
            .pipe(tap(data => {
                if (data instanceof Object) {
                    this.currentUser = <IUser>data;
                }
            }))
            .subscribe();
    }
}

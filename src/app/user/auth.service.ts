import { Injectable } from '@angular/core'
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: HttpClient) {

    }

    loginUser(userName: string, password: string): Observable<any> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        let loginInfo = { username: userName, password: password };
        return this.http.post('/api/login', loginInfo, options)
            .pipe(tap(data => { this.currentUser = <IUser>data['user']; }))
            .pipe(catchError((error: any) => {
                return of(false);
            }));
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }

    logoutUser() {
        this.currentUser = null;
    }

    isAuthenticated() {
        return !!this.currentUser;
    }
}
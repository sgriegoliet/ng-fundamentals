import { Injectable } from '@angular/core';
import { ISession } from './event.model';
import { IUser } from 'src/app/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class VoterService {
  constructor(private http: HttpClient) {

  }

  deleteVoter(eventId: number, session: ISession, user: IUser): Observable<ISession> {
    session.voters = session.voters.filter(voter => voter !== user.userName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${user.userName}`;
    return this.http.delete<ISession>(url).pipe(catchError(this.handleError<ISession>('deleteVoter')));
  }

  addVoter(eventId: number, session: ISession, user: IUser): Observable<ISession> {
    session.voters.push(user.userName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${user.userName}`;
    const options = { headers: new HttpHeaders({ 'Content-Type': '/application/json' }) };
    return this.http.post<ISession>(url, {}, options).pipe(catchError(this.handleError<ISession>('addVoter')));
  }

  userHasVoted(session: ISession, user: IUser): boolean {
    return session.voters.findIndex(voter => voter.toLocaleLowerCase() === user.userName) >= 0;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

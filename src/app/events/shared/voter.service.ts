import { Injectable } from '@angular/core'
import { ISession } from './event.model';
import { IUser } from 'src/app/user';

@Injectable()
export class VoterService {

  deleteVoter(session: ISession, user: IUser) {
    session.voters = session.voters.filter(voter => voter !== user.userName)
  }

  addVoter(session: ISession, user: IUser) {
    session.voters.push(user.userName);
  }

  userHasVoted(session: ISession, user: IUser): boolean {
    return session.voters.findIndex(voter => voter.toLocaleLowerCase() == user.userName) >= 0;
  }
}

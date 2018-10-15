import { VoterService } from './voter.service'
import { ISession } from './event.model';
import { IUser } from 'src/app/user';
import { of } from 'rxjs';


describe('VoterService', () => {
    let voterService: VoterService;
    let mockHttp;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        voterService = new VoterService(mockHttp);
    })

    describe('deleteVoter', () => {
        it('should remove the voter form the list of voters', () => {
            var session = { id: 1, voters: ["joe", "john"] };
            var user = {userName:"joe"};

            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(3, <ISession>session, <IUser>user);

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");
        })
    });
})
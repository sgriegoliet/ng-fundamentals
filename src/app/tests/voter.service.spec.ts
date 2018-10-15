import { of } from 'rxjs';

import { IUser } from 'src/app/user';
import { VoterService, ISession } from '../events';


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

        it('should call http.delete with the right URL', ()=>{
            var session = { id: 6, voters: ["joe", "john"] };
            var user = {userName:"joe"};

            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(3, <ISession>session, <IUser>user);

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe')
        });
    });

    describe('addVoter', () => {
        it('should add the voter form the list of voters', () => {
            var session = { id: 1, voters: ["john"] };
            var user = {userName:"joe"};

            mockHttp.post.and.returnValue(of(false));
            voterService.addVoter(3, <ISession>session, <IUser>user);

            expect(session.voters.length).toBe(2);
            expect(session.voters).toContain("joe");
        })


        it('should call http.post with the right URL and data', ()=>{
            var session = { id: 6, voters: ["john"] };
            var user = {userName:"joe"};

            mockHttp.post.and.returnValue(of(false));
            voterService.addVoter(3, <ISession>session, <IUser>user);

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe',{}, jasmine.any(Object));
        });
    });
})
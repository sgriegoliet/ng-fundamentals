import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { DebugElement } from '@angular/core';
import { SessionListComponent, VoterService, ISession, SessionFilterOptions, SessionSortOptions, UpvoteComponent, DurationPipe } from '../../events';
import { AuthService, IUser } from '../../user';
import { By } from '@angular/platform-browser';
import { CollapsibleWellComponent } from '../../common';


describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>;
    let component: SessionListComponent;
    let element: HTMLElement;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: <IUser>{ userName: 'steve' }
        };
        let mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                UpvoteComponent,
                DurationPipe,
                CollapsibleWellComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService },
            ],
            schemas: []
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debugElement = fixture.debugElement;
    })

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = <ISession[]>[{ id: 3, name: 'Session 1', presenter: 'Steve', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john'] }]
            component.filterBy = SessionFilterOptions.All;
            component.sortedBy = SessionSortOptions.Votes;
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector("[well-title]").textContent).toContain('Session 1');
        })

        it('should have the correct duration text', () => {
            component.sessions = <ISession[]>[{ id: 3, name: 'Session 1', presenter: 'Steve', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john'] }]
            component.filterBy = SessionFilterOptions.All;
            component.sortedBy = SessionSortOptions.Votes;
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector("div[well-body] span").textContent).toContain('Half Hour');
        })
    })
})
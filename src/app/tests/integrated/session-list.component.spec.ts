import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent, VoterService, ISession, SessionFilterOptions, SessionSortOptions, DurationPipe } from '../../events';
import { AuthService, IUser } from '../../user';
import { By } from '@angular/platform-browser';


describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>;
    let component: SessionListComponent;
    let element: HTMLElement;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        const mockAuthService = {
            isAuthenticated: () => true,
            currentUser: <IUser>{ userName: 'steve' }
        };
        const mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                DurationPipe,
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debugElement = fixture.debugElement;
    });

    describe('initial display', () => {
        it('should have the correct session title', () => {
            const session = {
                id: 3, name: 'Session 1', presenter: 'Steve', duration: 1,
                level: 'beginner', abstract: 'abstract', voters: ['john']
            };
            component.sessions = <ISession[]>[session];
            component.filterBy = SessionFilterOptions.All;
            component.sortedBy = SessionSortOptions.Votes;
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
        });

        it('should have the correct duration text', () => {
            const session = {
                id: 3, name: 'Session 1', presenter: 'Steve', duration: 1,
                level: 'beginner', abstract: 'abstract', voters: ['john']
            };
            component.sessions = <ISession[]>[session];
            component.filterBy = SessionFilterOptions.All;
            component.sortedBy = SessionSortOptions.Votes;
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(debugElement.query(By.css('div[well-body] span')).nativeElement.textContent).toContain('Half Hour');
        });
    });
});

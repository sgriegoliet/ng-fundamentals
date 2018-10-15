import { SessionListComponent, ISession, SessionFilterOptions, SessionSortOptions } from "../events";

describe('SessionListComponent', () => {
    let componentUnderTest: SessionListComponent;
    let mockAuthService, mockVoterService;

    beforeEach(() => {
        componentUnderTest = new SessionListComponent(mockAuthService, mockVoterService);
    })

    describe('ngOnChanges', () => {
        it('should filter the intermediate sessions correctly', () => {
            componentUnderTest.sessions = <ISession[]>[{ name: 'a', level: 'intermediate' },
            { name: 'b', level: 'intermediate' },
            { name: 'c', level: 'beginner' },
            { name: 'd', level: 'advanced' },
            ];
            componentUnderTest.sortedBy = SessionSortOptions.Name;
            componentUnderTest.eventId = 3;

            componentUnderTest.filterBy = SessionFilterOptions.Intermediate;
            componentUnderTest.ngOnChanges();

            expect(componentUnderTest.visibleSessions.length).toBe(2);
            expect(componentUnderTest.visibleSessions.map(session => session.level.toLocaleLowerCase)).not.toContain(() => SessionFilterOptions[SessionFilterOptions.Beginner].toLocaleLowerCase())
            expect(componentUnderTest.visibleSessions.map(session => session.level.toLocaleLowerCase)).not.toContain(() => SessionFilterOptions[SessionFilterOptions.Advanced].toLocaleLowerCase())
        })

        it('should filter the beginner sessions correctly', () => {
            componentUnderTest.sessions = <ISession[]>[{ name: 'a', level: 'intermediate' },
            { name: 'b', level: 'intermediate' },
            { name: 'c', level: 'beginner' }];
            componentUnderTest.sortedBy = SessionSortOptions.Name;
            componentUnderTest.eventId = 3;

            componentUnderTest.filterBy = SessionFilterOptions.Beginner;
            componentUnderTest.ngOnChanges();

            expect(componentUnderTest.visibleSessions.length).toBe(1);
            expect(componentUnderTest.visibleSessions.map(session => session.level.toLocaleLowerCase)).not.toContain(() => SessionFilterOptions[SessionFilterOptions.Intermediate].toLocaleLowerCase())
            expect(componentUnderTest.visibleSessions.map(session => session.level.toLocaleLowerCase)).not.toContain(() => SessionFilterOptions[SessionFilterOptions.Advanced].toLocaleLowerCase())
        })

        it('should filter the advanced sessions correctly', () => {
            componentUnderTest.sessions = <ISession[]>[{ name: 'a', level: 'intermediate' },
            { name: 'b', level: 'intermediate' },
            { name: 'c', level: 'beginner' }];
            componentUnderTest.sortedBy = SessionSortOptions.Name;
            componentUnderTest.eventId = 3;

            componentUnderTest.filterBy = SessionFilterOptions.Beginner;
            componentUnderTest.ngOnChanges();

            expect(componentUnderTest.visibleSessions.length).toBe(1);
            expect(componentUnderTest.visibleSessions.map(session => session.level.toLocaleLowerCase)).not.toContain(() => SessionFilterOptions[SessionFilterOptions.Intermediate].toLocaleLowerCase())
            expect(componentUnderTest.visibleSessions.map(session => session.level.toLocaleLowerCase)).not.toContain(() => SessionFilterOptions[SessionFilterOptions.Beginner].toLocaleLowerCase())
        })

        it('should sort the sessions by name correctly', () => {
            componentUnderTest.sessions = <ISession[]>[{ name: 'x', level: 'intermediate' },
            { name: 'b', level: 'intermediate' },
            { name: 'z', level: 'beginner' }];
            componentUnderTest.filterBy = SessionFilterOptions.All;
            componentUnderTest.eventId = 3;

            componentUnderTest.sortedBy = SessionSortOptions.Name;
            componentUnderTest.ngOnChanges();

            expect(componentUnderTest.visibleSessions.map(session => session.name)).toEqual(['b', 'x', 'z']);
        })

        it('should sort the sessions by name correctly', () => {
            componentUnderTest.sessions = <ISession[]>[
                { name: 'a', level: 'intermediate', voters: ['1', '2'] },
                { name: 'b', level: 'intermediate', voters: ['1', '2', '3'] },
                { name: 'c', level: 'beginner', voters: [] },
                { name: 'd', level: 'advanced', voters: ['1'] },
            ];
            componentUnderTest.filterBy = SessionFilterOptions.All;
            componentUnderTest.eventId = 3;

            componentUnderTest.sortedBy = SessionSortOptions.Votes;
            componentUnderTest.ngOnChanges();

            expect(componentUnderTest.visibleSessions.map(session => session.name)).toEqual(['b', 'a', 'd', 'c']);
        })
    })
});
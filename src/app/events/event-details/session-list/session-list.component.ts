import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../../shared';
import { SessionFilterOptions, SessionSortOptions } from '../event-details.component';
@Component({
    selector: 'session-list',
    templateUrl: 'session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: SessionFilterOptions
    @Input() sortedBy: SessionSortOptions

    visibleSessions: ISession[] = [];
    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortSessions(this.sortedBy);
        }
    }

    filterSessions(filterBy: SessionFilterOptions) {
        if (filterBy === SessionFilterOptions.All) {
            this.visibleSessions = this.sessions.slice(0);
        }
        else {
            console.log(SessionFilterOptions[filterBy].toLocaleLowerCase());
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === SessionFilterOptions[filterBy].toLocaleLowerCase();
            });
        }
    }

    sortSessions(sortedBy: SessionSortOptions) {
        if (sortedBy === SessionSortOptions.Name) {
            this.visibleSessions.sort(sortByNameAsc);
        }
        else if (sortedBy === SessionSortOptions.Votes){
            this.visibleSessions.sort(sortByVotersDesc);
        }
    }
}

function sortByVotersDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name)
        return 1
    else if (s1.name === s2.name)
        return 0;
    return -1;
}
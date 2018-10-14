import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../../shared';
import { SessionFilterOptions } from '../event-details.component';
@Component({
    selector: 'session-list',
    templateUrl: 'session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: SessionFilterOptions

    visibleSessions:ISession[] = [];
    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
        }
    }

    filterSessions(filterBy: SessionFilterOptions) {
        if (filterBy === SessionFilterOptions.All) {
            this.visibleSessions = this.sessions.slice(0);
        }
        else {
            console.log(SessionFilterOptions[filterBy].toLocaleLowerCase());
            this.visibleSessions = this.sessions.filter(session=>{
                return session.level.toLocaleLowerCase() === SessionFilterOptions[filterBy].toLocaleLowerCase();
            });
        }
    }
}
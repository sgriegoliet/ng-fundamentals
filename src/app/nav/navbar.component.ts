import { Component } from '@angular/core'
import { AuthService } from '../user';
import { ISession, EventService } from '../events';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
    searchTerm: string = "";
    foundSessions: ISession[] = [];

    constructor(private authService: AuthService, private eventService: EventService) { }

    logout() {
        this.authService.logoutUser();
    }

    searchSessions(searchTerm: string) {
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions;
        });
    }
}
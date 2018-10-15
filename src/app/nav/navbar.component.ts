import { Component } from '@angular/core';
import { AuthService } from '../user';
import { ISession, EventService } from '../events';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
    searchTerm = '';
    foundSessions: ISession[] = [];

    constructor(private authService: AuthService, private eventService: EventService, private router: Router) { }

    logout() {
        this.authService.logoutUser().subscribe(() => {
            this.router.navigate(['/user/login']);
        });
    }

    searchSessions(searchTerm: string) {
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions;
        });
    }
}

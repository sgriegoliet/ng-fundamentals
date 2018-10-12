import { Component } from '@angular/core'
import { AuthService } from '../user';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
    constructor(private authService: AuthService) {

    }
}
import { Component, OnInit } from '@angular/core'
import { ClientNotificationService } from '../common/client-notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'events-list',
    templateUrl: 'events-list.component.html'
})
export class EventsListComponent implements OnInit {
    events: any;
    constructor(private route: ActivatedRoute, private clientNotificationService: ClientNotificationService) {
    }

    ngOnInit() {
        this.events = this.route.snapshot.data['events'];
    }

    handleThumbnailClick(eventName) {
        this.clientNotificationService.success(eventName);
    }
}
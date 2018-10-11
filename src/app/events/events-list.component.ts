import {Component, OnInit} from '@angular/core'
import { EventService } from './shared/event.service';
import { ClientNotificationService } from '../common/client-notification.service';

@Component({
    selector:'events-list',
    templateUrl: 'events-list.component.html'
})
export class EventsListComponent implements OnInit{
    events:any[];
    constructor(private eventService:EventService,private clientNoficationService:ClientNotificationService){
    }

    ngOnInit(){
        this.events = this.eventService.getEvents();
    }

    handleThumbnailClick(eventName){
        this.clientNoficationService.success(eventName);
    }
}
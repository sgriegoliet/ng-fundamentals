import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Observable } from 'rxjs';

import { IEvent, EventService } from './shared';


@Injectable()
export class EventsListResolver implements Resolve<any>{
    constructor(private eventService: EventService) {

    }

    resolve(): Observable<IEvent[]> {
        return this.eventService.getEvents();
    }
}
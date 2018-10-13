import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import { EventService, IEvent, ISession } from '../shared';

@Component({
    templateUrl:'event-details.component.html',
    styles:[
        ".event-image {height:100px;}",
        ".container{padding-left:20px;padding-right:20px;}",
        "a {cursor:pointer}"
    ]
})
export class EventDetailsComponent implements OnInit{
    event: IEvent;
    addMode:boolean=false;

    constructor(private eventService:EventService, private route:ActivatedRoute)
    {
    }

    ngOnInit(){
        const eventId = +this.route.snapshot.params['id'];
        this.event = this.eventService.getEvent(eventId);
    }
    addSession(){
        this.addMode = true;
    }

    saveNewSession(session:ISession){
        const nextId = Math.max.apply(null, this.event.sessions.map(s=>s.id));
        session.id = nextId +1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode = false;
    }
}
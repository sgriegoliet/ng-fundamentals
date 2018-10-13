import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import { EventService, IEvent } from '../shared';

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
}
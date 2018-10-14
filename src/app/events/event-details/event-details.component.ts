import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { EventService, IEvent, ISession } from '../shared';

export enum SessionFilterOptions {
    All = 1,
    Beginner = 2,
    Intermediate = 3,
    Advanced = 4
}

export enum SessionSortOptions {
    Name = 1,
    Votes = 2,
}


@Component({
    templateUrl: 'event-details.component.html',
    styles: [
        ".event-image {height:100px;}",
        ".container{padding-left:20px;padding-right:20px;}",
        "a {cursor:pointer}",
    ]
})
export class EventDetailsComponent implements OnInit {
    event: IEvent;
    addMode: boolean = false;
    filterBy: SessionFilterOptions = SessionFilterOptions.All;
    sortedBy: SessionSortOptions = SessionSortOptions.Name;
    FilterBy = SessionFilterOptions;
    SortedBy = SessionSortOptions;

    constructor(private eventService: EventService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const eventId = +this.route.snapshot.params['id'];
        this.event = this.eventService.getEvent(eventId);
    }
    addSession() {
        this.addMode = true;
    }

    saveNewSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }

    setFilterBy(filterBy: SessionFilterOptions) {
        this.filterBy = filterBy;
    }

    isFilteredBy(filterBy: SessionFilterOptions): boolean {
        return this.filterBy === filterBy;
    }

    setSortedBy(sortedBy: SessionSortOptions) {
        this.sortedBy = sortedBy;
    }

    isSortedBy(sortedBy: SessionSortOptions): boolean {
        return this.sortedBy === sortedBy;
    }
}
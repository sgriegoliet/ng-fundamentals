import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDirtyableComponent } from '../../common';
import { IEvent, EventService } from '../shared';

@Component({
    templateUrl: 'create-event.component.html',
})
export class CreateEventComponent implements IDirtyableComponent {
    constructor(private router: Router, private eventService: EventService) {
    }

    isCreateFormDirty = true;
    newEventForm: IEvent;

    saveEvent(formValues) {
        this.eventService.saveEvent(formValues).subscribe(() => {
            this.isCreateFormDirty = false;
            this.router.navigate(['/events']);
        });
    }

    cancel() {
        this.router.navigate(['/events']);
    }

    isDirty() { return this.isCreateFormDirty; }
}

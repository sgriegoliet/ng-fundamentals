import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EventsAppComponent } from './events-app.component';
import { appRoutes } from './routes';

import { EventsListComponent, EventThumbnailComponent, EventService, EventDetailsComponent, CreateEventComponent, EventRouteActivator, EventListResolver, CreateSessionComponent, SessionListComponent, DurationPipe } from './events'
import { IClientNotificationService, IDirtyableComponent, CollapsibleWellComponent, TOASTR_TOKEN, ClientNotificationService, IBrowserUIService, JQUERY_TOKEN, BrowserUIService } from './common';
import { Error404Component } from './errors';
import { NavbarComponent } from './nav';
import { AuthService } from './user';

let toastr: IClientNotificationService = window['toastr'];
let jQuery: IBrowserUIService = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    EventService,
    EventRouteActivator,
    EventListResolver,
    AuthService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: ClientNotificationService, useExisting: TOASTR_TOKEN },
    { provide: JQUERY_TOKEN, useValue: jQuery },
    { provide: BrowserUIService, useExisting: JQUERY_TOKEN },
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    NavbarComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }


export function checkDirtyState(component: IDirtyableComponent) {
  if (component.isDirty()) {
    return window.confirm('You have not saved, do you really want to cancel?');
  }
  return true;
}
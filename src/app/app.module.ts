import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EventsAppComponent } from './events-app.component';
import { appRoutes } from './routes';

import { EventsListComponent, EventThumbnailComponent, EventService, EventDetailsComponent, CreateEventComponent, EventRouteActivator, EventListResolver, CreateSessionComponent, SessionListComponent } from './events'
import { ClientNotificationService, IDirtyableComponent } from './common';
import { Error404Component } from './errors';
import { NavbarComponent } from './nav';
import { AuthService } from './user';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventService,
    ClientNotificationService,
    EventRouteActivator,
    EventListResolver,
    AuthService,
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
    SessionListComponent
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
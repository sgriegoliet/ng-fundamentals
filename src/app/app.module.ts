import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EventsAppComponent } from './events-app.component';
import { appRoutes } from './routes';

import { EventsListComponent, EventThumbnailComponent, EventService, EventDetailsComponent, CreateEventComponent, EventRouteActivator, EventListResolver } from './events/index'
import { ClientNotificationService } from './common/index';
import { Error404Component } from './errors/index';
import { NavbarComponent } from './nav/index';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventService,
    ClientNotificationService,
    EventRouteActivator,
    EventListResolver,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    NavbarComponent
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }


export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
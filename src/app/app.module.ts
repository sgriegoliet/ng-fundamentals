import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { NavbarComponent } from './nav/navbar.component';
import {EventService} from './events/shared/event.service';
import {ClientNotificationService} from './common/client-notification.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers:[
    EventService,
    ClientNotificationService
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

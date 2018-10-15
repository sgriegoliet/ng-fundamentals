import {Component, Input } from '@angular/core';
import { IEvent } from './shared';

@Component({
    selector: 'event-thumbnail',
    templateUrl: 'event-thumbnail.component.html',
    styles: [
        '.pad-left{margin-left:10px;}',
        '.well div {color: #bbb}',
        '.thumbnail{min-height:210px;}',
        '.green{color:green !important;}',
        '.red{color:red !important;}',
        '.bold, .strong{font-weight:bold !important;}'
    ]
})
export class EventThumbnailComponent {
    @Input() event: IEvent;


    getStartTimeClass() {
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        return {green: isEarlyStart, bold: isEarlyStart, strong: !isEarlyStart};
    }

}

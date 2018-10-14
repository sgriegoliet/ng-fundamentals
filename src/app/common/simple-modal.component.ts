import { Component, Input } from '@angular/core';
import { BrowserUIService } from './jquery.service';

@Component({
    selector: 'simple-modal',
    templateUrl: 'simple-modal.component.html',
    styles: [
        `
        .modal-body{height:250px; overflow-y:scroll;}
        `
    ]
})
export class SimpleModalComponent {
    @Input() title: string = "";
    @Input() elementId:string;

    constructor(private browserUIService: BrowserUIService) {

    }
}
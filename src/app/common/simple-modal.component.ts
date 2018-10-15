import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQUERY_TOKEN } from './jquery.service';

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
    @Input() title = '';
    @Input() elementId: string;
    @Input() closeOnBodyClick = 'true';
    @ViewChild('modalContainer') containerElement: ElementRef;

    constructor(@Inject(JQUERY_TOKEN) private $: any) {

    }

    closeModal() {
        if (this.closeOnBodyClick.toLocaleLowerCase() == 'true') {
            this.$(this.containerElement.nativeElement).modal('hide');
        }
    }
}

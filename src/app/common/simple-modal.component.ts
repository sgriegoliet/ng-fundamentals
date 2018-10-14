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
    @Input() title: string = "";
    @Input() elementId:string;
    @ViewChild('modalContainer') containerElement:ElementRef;

    constructor(@Inject(JQUERY_TOKEN) private $: any) {

    }

    closeModal(){
        this.$(this.containerElement.nativeElement).modal('hide');
    }
}
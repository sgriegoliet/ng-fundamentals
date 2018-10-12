import { Component, OnInit } from '@angular/core'
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ISession } from '../../shared';
import { restrictedWords } from '../../../common';

@Component({
    templateUrl: 'create-session.component.html'
})
export class CreateSessionComponent implements OnInit {
    name: FormControl;
    presenter: FormControl;
    duration: FormControl;
    level: FormControl;
    abstract: FormControl;
    newSessionForm: FormGroup;

    ngOnInit() {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo','bar'])]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract,
        })
    }

    validate(field: string, validator: string) {
        if (validator == undefined) {
            return !(this[field].invalid && this[field].dirty);
        }
        else {
            return !(this[field].invalid && this[field].dirty && this[field].errors[validator]);
        }
    }

    saveSession(formValues) {
        let session: ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: [],
        }
        console.log(session);
    }
}
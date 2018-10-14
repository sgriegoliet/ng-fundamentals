import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { IClientNotificationService, TOASTR_TOKEN } from '../common';


@Component({
  templateUrl: './profile.component.html',
  styles: [
    'em {float:right; color:#E05C65; padding-left:10px;}',
    '.error input {background-color: #E3C3C5;}',
    '.error ::-webkit-input-placeholder {color:#999;}',
    '.error ::-moz-placeholder {color:#999;}',
    '.error :-moz-placeholder {color:#999;}',
    '.error :ms-input-placeholder {color:#999;}',
  ]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(private authService: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private clientNotificationService: IClientNotificationService) {

  }

  ngOnInit() {
    let currentUser = this.authService.currentUser;
    this.firstName = new FormControl(currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.clientNotificationService.success(`Successfully updated name to ${this.firstName.value} ${this.lastName.value}.`)
      this.router.navigate(['events']);
    }
  }

  validate(field: string): boolean {
    return this[field].valid || this[field].untouched;
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
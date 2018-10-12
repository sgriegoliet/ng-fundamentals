import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    var currentUser = this.authService.currentUser;
    let firstName = new FormControl(currentUser.firstName);
    let lastName = new FormControl(currentUser.lastName);
    this.profileForm = new FormGroup({
      firstName: firstName,
      lastName: lastName
    })
  }

  saveProfile(formValues){
    this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
    this.router.navigate(['events']);
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
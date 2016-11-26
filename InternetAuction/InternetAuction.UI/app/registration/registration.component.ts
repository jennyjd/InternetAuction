import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service'

@Component({
    selector: 'registration',
    templateUrl: './app/registration/registration.component.html',
    styleUrls: ['./app/registration/registration.component.css']
})

export class RegistrationComponent {
    model: any = {};
    loading = false;

    constructor(private router: Router, private userService: UserService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                console.log("OK");
                // set success message and pass true paramater to persist the message after redirecting to the login page
               // this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
               // this.alertService.error(error);
                console.log("ERROR");
                this.loading = false;
            });
    }
}

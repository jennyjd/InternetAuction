import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Constant } from '../../globals';
import { UserService } from '../../user/user.service';
import { SharedService } from '../../shared.service';

@Component({
    selector: 'registration',
    templateUrl: `${Constant.appPath}app/admin/admin-registration/admin-registration.component.html`,
    styleUrls: [`${Constant.appPath}app/admin/admin-registration/admin-registration.component.css`],
    providers: [UserService]
})

export class AdminRegistrationComponent {
    userModel: any = {};
    errorMessage: any;

    constructor(private userService: UserService, private router: Router, private sharedService: SharedService) { }

    register() {
        this.userService.createAdmin(this.userModel)
            .subscribe(res => {
                this.sharedService.saveSuccess(true);
                this.router.navigate(['/admin']);
            },
            error => {
                this.errorMessage = error;
            });
    }
}

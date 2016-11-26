import { Component } from '@angular/core';
import { Router} from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'user-details',
    templateUrl: './app/user/user-detail/user-detail.component.html',
    styleUrls: ['./app/user/user-detail/user-detail.component.css'],
    providers: [UserService]
})

export class UserDetailsComponent {
    currentUser: User;

    constructor(private userService: UserService) { }

}

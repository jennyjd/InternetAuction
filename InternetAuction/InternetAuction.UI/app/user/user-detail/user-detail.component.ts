import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

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

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

}

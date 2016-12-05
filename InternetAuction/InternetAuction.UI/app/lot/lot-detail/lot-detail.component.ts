import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { LotService } from '../lot.service';
import { UserService } from '../../user/user.service';

@Component({
    selector: 'lot-detail',
    templateUrl: './app/lot/lot-detail/lot-detail.component.html',
    styleUrls: ['./app/lot/lot-detail/lot-detail.component.css'],
    providers: [LotService, UserService]
})

export class LotDetailComponent implements OnInit {
    selected_lot: any = {};
    userInformation: any = {};
    errorMessage: any;
    model: any = {};

    constructor(private route: ActivatedRoute, private router: Router, private lotservise: LotService, private userServise: UserService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.lotservise.getLotById(+params['id']))
            .subscribe(res => {
                console.log(res);
                this.selected_lot = res;
                this.getUserInf();
            },
            error => this.errorMessage = <any>error);
        console.log(this.selected_lot);
    }

    getUserInf() {
        this.userServise.getUserById(this.selected_lot.ClientId)
            .subscribe(res => {
                console.log(res);
                this.userInformation = res;
                console.log(this.userInformation);
            },
            error => this.errorMessage = <any>error);
    }
}

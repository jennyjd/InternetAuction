import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { LotService } from '../lot.service';
import { UserService } from '../../user/user.service';
import { GeneralService } from '../../general.service';
import { Constant } from '../../globals';

@Component({
    selector: 'lot-detail',
    templateUrl: `${Constant.appPath}app/lot/lot-detail/lot-detail.component.html`,
    styleUrls: [`${Constant.appPath}app/lot/lot-detail/lot-detail.component.css`],
    providers: [LotService, UserService, GeneralService]
})

export class LotDetailComponent implements OnInit {
    selected_lot: any = {};
    userInformation: any = {};
    errorMessage: any;
    model: any = {};
    lotState: string = '';
    currency: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private lotservise: LotService,
        private userServise: UserService,
        private generalServise: GeneralService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.lotservise.getLotById(+params['id']))
            .subscribe(res => {
                this.selected_lot = res;
                console.log(this.selected_lot);
                this.lotState = this.selected_lot.GoodsState.Name;
                this.currency = this.selected_lot.Currency.ShortName;
                this.getUserInf();
            },
            error => this.errorMessage = <any>error);
    }

    getUserInf() {
        this.userServise.getUserById(this.selected_lot.ClientId)
            .subscribe(res => {
                this.userInformation = res;
            },
            error => this.errorMessage = <any>error);
    }

    checkFastSell(lot) {
        if (lot.PriceOfFastSell == null) { return false; }
        return true;
    }
}

import { Component } from '@angular/core';

import { LotService } from '../lot/lot.service';
import { Constant } from '../globals';

@Component({
    selector: 'admin',
    templateUrl: `${Constant.appPath}app/admin/admin.component.html`,
    styleUrls: [`${Constant.appPath}app/admin/admin.component.css`],
    providers: [LotService]
})

export class AdminComponent {
    errorMessage: any;

    viewLots: any[] = []
    currentLots: any[] = [];
    completedLots: any[] = [];

    constructor(private lotService: LotService) {
        this.testLotRequest();
    }

    testLotRequest() {
        this.lotService.getLots()
            .subscribe(res => {
                this.viewLots = res;
                for (let lot of res) {
                    if (lot.IsCompleted == false) { this.currentLots.push(lot); }
                    else { this.completedLots.push(lot); }
                }
            },
            error => this.errorMessage = <any>error);
    }

    changeToCurrent() {
        this.viewLots = this.currentLots;
    }

    changeToCompleted() {
        this.viewLots = this.completedLots;
    }
}

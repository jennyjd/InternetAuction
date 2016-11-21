import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { LotService } from '../lot.service';

@Component({
    selector: 'lot-detail',
    templateUrl: './app/lot/lot-detail/lot-detail.component.html',
    styleUrls: ['./app/lot/lot-detail/lot-detail.component.css'],
    providers: [LotService]
})

export class LotDetailComponent implements OnInit {
    errorMessage: any;

    constructor(private route: ActivatedRoute, private router: Router, private lotservise: LotService) { }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.lotservise.getLotById(+params['id']))
            .subscribe(res => {
                console.log(res);
            },
            error => this.errorMessage = <any>error);
    }
}

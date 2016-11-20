import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'lot-detail',
    templateUrl: './app/lot/lot-detail/lot-detail.component.html',
    styleUrls: ['./app/lot/lot-detail/lot-detail.component.css']
})

export class LotDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        /*this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.service.getHero(+params['id']))
            .subscribe((hero: Hero) => this.hero = hero);*/
    }
}

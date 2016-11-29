import { Component, Input, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { Lot } from './lot';
import { SharedService } from '../shared.service';

@Component({
    selector: 'lot',
    templateUrl: './app/lot/lot.component.html',
    styleUrls: ['./app/lot/lot.component.css'],
    providers: [SharedService]
})

export class LotComponent implements DoCheck {
    //@Input() selected: string;
    @Input() lotitem: Lot;
    selected = "none";

    constructor(private router: Router, private sharedService: SharedService) {
    }

    ngDoCheck() {
        this.selected = this.sharedService.getSelected();
    }

    view_details(lotitem: Lot) {
        lotitem.visible_items = false;
        this.router.navigate(['/lotdetail', lotitem.id]);
    }

    over(lotitem) {
        lotitem.visible_items = true;
    }

    out(lotitem) {
        lotitem.visible_items = false;
    }

}

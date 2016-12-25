import { Component, Input, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { Lot } from './lot';
import { SharedService } from '../shared.service';
import { Constant } from '../globals';

@Component({
    selector: 'lot',
    templateUrl: `${Constant.appPath}app/lot/lot.component.html`,
    styleUrls: [`${Constant.appPath}app/lot/lot.component.css`],
    providers: [SharedService]
})

export class LotComponent implements DoCheck {
    //@Input() selected: string;
    path = Constant.path;
    @Input() lotitem: any;
    selectedCategoryId = "none";

    constructor(private router: Router, private sharedService: SharedService) { }

    ngDoCheck() {
        this.selectedCategoryId = this.sharedService.getSelected();
    }

    view_details(lotitem) {
        lotitem.visible_items = false;
        this.router.navigate(['/lotdetail', lotitem.Id]);
    }

    over(lotitem) {
        lotitem.visible_items = true;
    }

    out(lotitem) {
        lotitem.visible_items = false;
    }

}

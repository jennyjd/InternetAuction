import { Component, Input } from '@angular/core';
import { Lot } from './lot';

@Component({
    selector: 'lot',
    templateUrl: './app/lot/lot-list-view.component.html',
    styleUrls: ['./app/lot/lot-list-view.component.css']
})

export class LotComponent {
    @Input() selected: string;
    @Input() lotitem: Lot;
}

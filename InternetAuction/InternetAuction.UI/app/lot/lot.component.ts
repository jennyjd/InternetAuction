import { Component, Input } from '@angular/core';
import { Lot } from './lot';

@Component({
    selector: 'lot',
    templateUrl: './app/lot/lot.component.html',
    styleUrls: ['./app/lot/lot.component.css']
})

export class LotComponent {
    @Input() lotitem: Lot;
}

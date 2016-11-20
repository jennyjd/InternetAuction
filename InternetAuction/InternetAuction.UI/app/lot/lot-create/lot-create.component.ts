import { Component } from '@angular/core';

import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

@Component({
    selector: 'lot-create-form',
    templateUrl: './app/lot/lot-create/lot-create.component.html',
    styleUrls: ['./app/lot/lot-create/lot-create.component.css'],
    providers: [MdUniqueSelectionDispatcher]
})

export class LotCreateComponent {
    lot: any = {};

    createLot() {
        console.log("Name: " + this.lot.name + "\nState: " + this.lot.state);
    }
}
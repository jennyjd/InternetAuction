import { Component } from '@angular/core';
import { LotComponent } from './lot/lot.component'
import { LotListComponent } from './lot/lot-list/lot-list.component'

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
    entryComponents: [LotComponent, LotListComponent]
})

export class AppComponent {
    title: "Auction";
}

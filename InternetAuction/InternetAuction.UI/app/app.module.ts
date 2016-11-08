import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LotComponent } from './lot/lot.component'
import { LotListComponent } from './lot/lot-list/lot-list.component'

import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdListModule } from '@angular2-material/list';
import { MdInputModule } from '@angular2-material/input';

import { MdIconRegistry } from '@angular2-material/icon';

@NgModule({
    imports: [BrowserModule, MdCardModule, MdButtonModule, MdIconModule, MdSidenavModule, MdToolbarModule,
        MdListModule, MdInputModule],
    declarations: [AppComponent, LotComponent, LotListComponent],
    bootstrap: [AppComponent],
    providers: [MdIconRegistry]
})
export class AppModule { }

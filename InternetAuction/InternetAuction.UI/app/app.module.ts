﻿import { NgModule } from '@angular/core';
import { OVERLAY_PROVIDERS } from "@angular2-material/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LotComponent } from './lot/lot.component';
import { LotListComponent } from './lot/lot-list/lot-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDetailsComponent } from './user/user-detail/user-detail.component';
import { LotCreateComponent } from './lot/lot-create/lot-create.component';
import { LotDetailComponent } from './lot/lot-detail/lot-detail.component';

import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';

import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdListModule } from '@angular2-material/list';
import { MdInputModule } from '@angular2-material/input';
import { MdIconRegistry } from '@angular2-material/icon';
import { MdRadioModule } from '@angular2-material/radio';
import { Md2Module } from 'md2';

import { ImageUploadModule } from 'angular2-image-upload';

import { routing, appRoutingProviders } from './app.routing'

@NgModule({
    imports: [BrowserModule, MdCardModule, MdButtonModule, MdIconModule, MdSidenavModule, MdToolbarModule,
        MdListModule, MdInputModule, routing, FormsModule, MdRadioModule, ImageUploadModule.forRoot(), Md2Module.forRoot()],
    declarations: [AppComponent, LotComponent, LotListComponent, LoginComponent, HomeComponent, RegistrationComponent,
        UserDetailsComponent, LotCreateComponent, LotDetailComponent],
    bootstrap: [AppComponent],
    providers: [MdIconRegistry, OVERLAY_PROVIDERS, appRoutingProviders, UserService, LoginService]
})
export class AppModule { }
﻿import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDetailsComponent } from './user/user-detail/user-detail.component';


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'userdetail',
        component: UserDetailsComponent
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

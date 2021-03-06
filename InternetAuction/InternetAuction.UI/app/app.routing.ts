﻿import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDetailsComponent } from './user/user-detail/user-detail.component';
import { LotCreateComponent } from './lot/lot-create/lot-create.component';
import { LotDetailComponent } from './lot/lot-detail/lot-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AdminRegistrationComponent } from './admin/admin-registration/admin-registration.component';


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
    },
    {
        path: 'createlot',
        component: LotCreateComponent
    },
    {
        path: 'lotdetail/:id',
        component: LotDetailComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'adminregistration',
        component: AdminRegistrationComponent
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

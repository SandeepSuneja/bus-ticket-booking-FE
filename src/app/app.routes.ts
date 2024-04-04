import { Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { UserComponent } from './main/user/user.component';
import { AdminComponent } from './main/admin/admin.component';
import { NotFoundComponent } from './main/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

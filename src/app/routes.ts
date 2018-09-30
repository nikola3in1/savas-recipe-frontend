import { Routes } from '@angular/router';
import { MainComponent } from './_pages/main/main.component';
import { ErrorComponent } from './_pages/error/error.component';

export const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: '**', component: MainComponent },
    { path: '*', component: MainComponent },
    { path: 'error', component: ErrorComponent }
];
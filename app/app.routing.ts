import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { SetupComponent } from './pages/setup/setup.component';

const routes: Routes = [
    { path: '', redirectTo: '/roster/roster', pathMatch: 'full' },
    { path: 'roster', loadChildren: './pages/roster/roster.module#RosterModule' },
    { path: 'ops', loadChildren: './pages/ops/ops.module#OpsModule' },    
    { path: 'setup', component: SetupComponent },
    { path: '**', redirectTo: 'roster/roster' }
]

@NgModule({
    imports: [
        NativeScriptRouterModule.forRoot(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class AppRoutingModule { }

export const navigatableComponents = [
    SetupComponent
];
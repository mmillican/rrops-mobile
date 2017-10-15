import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { RosterComponent } from './components/list/roster.component';
import { RosterSyncComponent } from './components/sync/sync.component';
import { RosterDetailComponent } from './components/detail/detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/roster/roster', pathMatch: 'full' },
    { path: 'roster', component: RosterComponent },
    { path: 'sync', component: RosterSyncComponent },
    { path: 'details/:id', component: RosterDetailComponent }
]

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class RosterRoutingModule { }

export const RosterNavigatableComponents = [
    RosterComponent,
    RosterSyncComponent,
    RosterDetailComponent
]
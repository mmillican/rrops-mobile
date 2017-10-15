import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { TrainsComponent } from './pages/trains/trains.component';
import { TrainDetailComponent } from './pages/trains/train-detail.component';

import { ManifestComponent } from './pages/manifests/manifest.component';
import { ManifestLocationComponent } from './pages/manifests/manifest-location.component';

import { SetupComponent } from './pages/setup/setup.component';

const routes: Routes = [
    { path: '', redirectTo: '/roster/roster', pathMatch: 'full' },
    { path: 'roster', loadChildren: './pages/roster/roster.module#RosterModule' },
    { path: 'trains', component: TrainsComponent },
    { path: 'train-detail/:id', component: TrainDetailComponent },
    { path: 'manifest/:id', component: ManifestComponent },
    { path: 'manifest/:trainId/loc/:locId', component: ManifestLocationComponent },
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
    TrainsComponent,
    TrainDetailComponent,
    ManifestComponent,
    ManifestLocationComponent,
    SetupComponent
];
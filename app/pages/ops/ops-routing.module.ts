import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { TrainsComponent } from './components/trains/trains.component';
import { TrainDetailComponent } from './components/trains/train-detail.component';

import { ManifestComponent } from './components/manifests/manifest.component';
import { ManifestLocationComponent } from './components/manifests/manifest-location.component';

const routes: Routes = [
    { path: 'trains', component: TrainsComponent },
    { path: 'trains/detail/:id', component: TrainDetailComponent },
    { path: 'manifest/:id', component: ManifestComponent },
    { path: 'manifest/:trainId/loc/:locId', component: ManifestLocationComponent },
]

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class OpsRoutingModule { }

export const OpsNavigatableComponents = [
    TrainsComponent,
    TrainDetailComponent,
    ManifestComponent,
    ManifestLocationComponent
]
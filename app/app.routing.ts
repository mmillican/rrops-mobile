import { TrainsComponent } from "./pages/trains/trains.component";
import { TrainDetailComponent } from "./pages/trains/train-detail.component";

import { ManifestComponent } from "./pages/manifests/manifest.component";
import { ManifestLocationComponent } from "./pages/manifests/manifest-location.component";

import { RosterComponent } from "./pages/roster/roster.component";
import { RosterSyncComponent } from "./pages/roster/roster-sync.component";
import { RosterDetailComponent } from './pages/roster/roster-detail.component';

import { SetupComponent } from "./pages/setup/setup.component";

export const routes = [
    { path: "trains", component: TrainsComponent },
    { path: "train-detail/:id", component: TrainDetailComponent },
    { path: "manifest/:id", component: ManifestComponent },
    { path: "manifest/:trainId/loc/:locId", component: ManifestLocationComponent },
    { path: "roster", component: RosterComponent },
    { path: 'roster-detail/:id', component: RosterDetailComponent },
    { path: "roster-sync", component: RosterSyncComponent },
    { path: "setup", component: SetupComponent },
    { path: "**", redirectTo: "roster" }
];

export const navigatableComponents = [
    TrainsComponent,
    TrainDetailComponent,
    ManifestComponent,
    ManifestLocationComponent,
    RosterComponent,
    RosterSyncComponent,
    RosterDetailComponent,
    SetupComponent
];
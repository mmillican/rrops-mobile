import { TrainsComponent } from "./pages/trains/trains.component";
import { TrainDetailComponent } from "./pages/trains/train-detail.component";

import { ManifestComponent } from "./pages/manifests/manifest.component";
import { ManifestLocationComponent } from "./pages/manifests/manifest-location.component";

export const routes = [
    { path: "", component: TrainsComponent },
    { path: "train-detail/:id", component: TrainDetailComponent },
    { path: "manifest/:id", component: ManifestComponent },
    { path: "manifest/:trainId/loc/:locId", component: ManifestLocationComponent }
];

export const navigatableComponents = [
    TrainsComponent,
    TrainDetailComponent,
    ManifestComponent,
    ManifestLocationComponent
];
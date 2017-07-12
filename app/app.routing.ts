import { TrainsComponent } from "./pages/trains/trains.component";
import { TrainDetailComponent } from "./pages/trains/train-detail.component";

import { ManifestComponent } from "./pages/manifests/manifest.component";

export const routes = [
    { path: "", component: TrainsComponent },
    { path: "train-detail/:id", component: TrainDetailComponent },
    { path: "manifest/:id", component: ManifestComponent }
];

export const navigatableComponents = [
    TrainsComponent,
    TrainDetailComponent,
    ManifestComponent
];
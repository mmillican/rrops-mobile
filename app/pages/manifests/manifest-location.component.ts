import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

import { Manifest, ManifestLocation, LocationTrack, RosterItemMove } from "../../shared/manifest/manifest"
import { Car, Engine } from "../../shared/roster/rosterItem";
import { ManifestService } from "../../shared/manifest/manifest.service";

@Component({
    selector: "manifest-location",
    templateUrl: "pages/manifests/manifest-location.component.html",
    styleUrls: [ "pages/manifests/manifest.component.css"],
    providers: [ ManifestService ]
})
export class ManifestLocationComponent implements OnInit {
    private _manifest = new Manifest(null);
    private _manifestLocation = new ManifestLocation(null, null);
    
    isLoading = false;
    isLoaded = false;

    constructor(
        private _manifestService: ManifestService,
        private _zone: NgZone,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit() {
        let trainId = "";
        let locId = "";

        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                trainId = params["trainId"];
                locId = params["locId"];
            });

        console.log('view manifest for train id ' + trainId + ' at loc ' + locId);

        // TODO: Get data

        this._manifestService.getTrainManifest(trainId)
            .subscribe(data => {
                this._manifest = data;

                this._manifestLocation = this._manifest.manifestLocations.filter(ml => ml.id == locId)[0];
                console.log(JSON.stringify(this._manifestLocation));
            });
    }

    get manifest(): Manifest {
        return this._manifest;
    }

    get manifestLocation(): ManifestLocation {
        return this._manifestLocation;
    }
}
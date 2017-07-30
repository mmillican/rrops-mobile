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
    private _trainId = "";
    private _locId = "";
    
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
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                this._trainId = params["trainId"];
                this._locId = params["locId"];
            });

        console.log('view manifest for train id ' + this._trainId + ' at loc ' + this._locId);

        // TODO: Get data

        this._manifestService.getTrainManifest(this._trainId)
            .subscribe(data => {
                this._manifest = data;

                this._manifestLocation = this._manifest.manifestLocations.filter(ml => ml.id == this._locId)[0];
            });
    }

    get manifest(): Manifest {
        return this._manifest;
    }

    get manifestLocation(): ManifestLocation {
        return this._manifestLocation;
    }

    public onGoToNextLocation() {
        var nextLoc = this.getNextLocation();
        
        if (nextLoc) {
            console.log('next loc ' + nextLoc);
            this._routerExtensions.navigate(["/manifest", this._trainId, "loc", nextLoc.id]);
        }
    }

    private getNextLocation():ManifestLocation {
        let curLocIdx = this._manifest.manifestLocations.indexOf(this._manifestLocation);
        let nextLocIdx = curLocIdx + 1;

        let nextLoc = this._manifest.manifestLocations[nextLocIdx];
        return nextLoc;
    }
}
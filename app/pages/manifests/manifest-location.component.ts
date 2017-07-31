import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { Router, ActivatedRoute } from "@angular/router";

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
        private _route : ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _router: Router
    ) { }

    ngOnInit() {
        let sub = this._route.params.subscribe((params:any) => {
            this._trainId = params['trainId'];
            this._locId = params['locId'];

            this._manifestService.getTrainManifest(this._trainId)
                .subscribe(data => {
                    this._manifest = data;

                    this._manifestLocation = this._manifest.manifestLocations.filter(ml => ml.id == this._locId)[0];
                });
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
            this._router.navigate(["/manifest", this._trainId, "loc", nextLoc.id]);
        }
    }

    private getNextLocation():ManifestLocation {
        let curLocIdx = this._manifest.manifestLocations.indexOf(this._manifestLocation);
        let nextLocIdx = curLocIdx + 1;

        let nextLoc = this._manifest.manifestLocations[nextLocIdx];
        return nextLoc;
    }
}
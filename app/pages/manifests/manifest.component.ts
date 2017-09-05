import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

import { AppConfig } from "../../shared/app-config";

import { Manifest, ManifestLocation, LocationTrack, RosterItemMove } from "../../shared/manifest/manifest"
import { Car, Engine } from "../../shared/roster/rosterItem";
import { ManifestService } from "../../shared/manifest/manifest.service";

@Component({
    selector: "manifest",
    templateUrl: "pages/manifests/manifest.component.html",
    styleUrls: [ "pages/manifests/manifest.component.css" ],
    providers: [ AppConfig, ManifestService ]
})
export class ManifestComponent implements OnInit {
    manifest: Manifest = new Manifest(null);

    manifestItems = [ ];

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
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => { trainId = params["id"]; });

        console.log('view manifest for train id ' + trainId);

        this.isLoading = true;

        this._manifestService.getTrainManifest(trainId)
            .subscribe(data => {
                this.manifest = data;
                this.isLoaded = true;
                this.isLoading = false;

                this.manifest.manifestLocations.forEach(ml => {
                    var locItem = {
                        title: ml.id,
                        headerText: ml.name,
                        items: [ ]
                    };

                    ml.pickUps.forEach(lp => {
                        var puItem = {
                            text: lp.location.locationName + ' - ' + lp.location.trackId
                        }
                        locItem.items.push(puItem);
                    });

                    this.manifestItems.push(locItem);
                });
            });
    }

    onPickupLoaded(args) {
        console.log(JSON.stringify(args));
    }

}

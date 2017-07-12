import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

import { Manifest, ManifestLocation, LocationTrack, RosterItemMove } from "../../shared/manifest/manifest"
import { Car, Engine } from "../../shared/roster/rosterItem";
import { ManifestService } from "../../shared/manifest/manifest.service";

@Component({
    selector: "manifest",
    templateUrl: "pages/manifests/manifest.component.html",
    providers: [ ManifestService ]
})
export class ManifestComponent implements OnInit {
    manifest: Manifest = new Manifest(null);
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
            });
    }


}

import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

import { Train } from "../../shared/train/train";
import { TrainService } from "../../shared/train/trains.service";

import { Manifest, ManifestLocation, LocationTrack, RosterItemMove } from "../../shared/manifest/manifest"
import { Car, Engine } from "../../shared/roster/rosterItem";
import { ManifestService } from "../../shared/manifest/manifest.service"

@Component({
    selector: "trainDetails",
    templateUrl: "pages/trains/train-detail.component.html",
    styleUrls: [ "pages/trains/train-detail.component.css" ],
    providers: [ TrainService, ManifestService ]
})
export class TrainDetailComponent implements OnInit {
    private _train: Train = new Train();
    private _manifest: Manifest = new Manifest(null);
    private manifestItems = [ ];

    private _isDataLoaded: boolean = false;
    private _isLoading: boolean = false;

    constructor(
        private _trainService: TrainService,
        private _manifestService: ManifestService,
        private _pageRoute: PageRoute,
        private _zone: NgZone,
        private _routerExtensions: RouterExtensions,
        private _router: Router
    ) { }

    ngOnInit():void {
        let trainId = "";

        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                trainId = params["id"];
            });

        this._isLoading = true;
        this._trainService.getTrainById(trainId)
            .subscribe(data => {
                console.log('loaded train data');
                this._train = data;
                this._isDataLoaded = true;
                this._isLoading = false;
            });

        this._manifestService.getTrainManifest(trainId)
            .subscribe(data => {
                this._manifest = data;
            });
    }

    get train(): Train {
        return this._train;
    }

    get manifestLocations(): ManifestLocation[] {
        if (this._manifest && this._manifest.manifestLocations) {
            return this._manifest.manifestLocations;
        }

        return [];
    }
    
    get isDataLoaded(): boolean {
        return this._isDataLoaded;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    onLocationSelected(args): void { 
        let loc = args.view.bindingContext;
        // console.log('view loc ' + loc.id);
        this._router.navigate(["/manifest", this._train.id, "loc", loc.id]);
    }
}
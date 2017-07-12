import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

import { Train } from "../../shared/train/train";
import { TrainService } from "../../shared/train/trains.service";

@Component({
    selector: "trainDetails",
    templateUrl: "pages/trains/train-detail.component.html",
    providers: [ TrainService ]
})
export class TrainDetailComponent implements OnInit {
    private _train: Train = new Train();
    trainName: string = "";
    private _isDataLoaded: boolean = false;
    private _isLoading: boolean = false;

    constructor(
        private _trainService: TrainService,
        private _pageRoute: PageRoute,
        private _zone: NgZone,
        private _routerExtensions: RouterExtensions
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
                this.trainName = data.name;
                this._isDataLoaded = true;
                this._isLoading = false;
            });
    }

    onViewManifest(args): void {
        this._routerExtensions.navigate(["/manifest", this._train.id]);
    }

    get train(): Train {
        return this._train;
    }
    
    get isDataLoaded(): boolean {
        return this._isDataLoaded;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
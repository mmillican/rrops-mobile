import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Train } from "../../shared/train/train";
import { TrainService } from "../../shared/train/trains.service";

@Component({
    selector: "trains",
    templateUrl: "pages/trains/trains.component.html",
    providers: [ TrainService ]
})
export class TrainsComponent implements OnInit{
    trainList: Array<Train> = [];
    train: "";
    isLoading = false;
    listLoaded = false;

    // @ViewChild

    constructor(
        private _trainService: TrainService, 
        private zone: NgZone,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this._trainService.load()
            .subscribe(loadedTrains => {
                loadedTrains.forEach((trainObj) => {
                    this.trainList.unshift(trainObj);
                });
                console.log(this.trainList[0].name);
                this.isLoading = false;
                this.listLoaded = true;
            });
    }

    onTrainSelected(args): void{
        const train = args.view.bindingContext;
        this._routerExtensions.navigate(["/train-detail", train.id]);
    }
}
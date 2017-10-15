import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';

import { AppConfig } from "../../../../shared/app-config";

import { Train } from "../../../../shared/train/train";
import { TrainService } from "../../../../shared/train/trains.service";

@Component({
    moduleId: module.id,
    selector: "trains",
    templateUrl: "./trains.component.html",
    providers: [ AppConfig, TrainService ]
})
export class TrainsComponent implements OnInit, AfterViewInit {
    trainList: Array<Train> = [];
    train: "";
    isLoading = false;
    listLoaded = false;

    // @ViewChild
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(
        private _trainService: TrainService, 
        private zone: NgZone,
        private _routerExtensions: RouterExtensions,
        private _changeDetectionRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.isLoading = true;
        this._trainService.load()
            .subscribe(loadedTrains => {
                loadedTrains.forEach((trainObj) => {
                    this.trainList.unshift(trainObj);
                });
                this.isLoading = false;
                this.listLoaded = true;
            });
    }

    onToggleSideDrawer(): void {
        this.drawer.toggleDrawerState();
    }

    onTrainSelected(args): void{
        const train = args.view.bindingContext;
        this._routerExtensions.navigate(["/ops/trains/detail", train.id]);
    }
}
import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";

@Component({
    selector: "roster",
    templateUrl: "pages/roster/roster.component.html"
})
export class RosterComponent implements OnInit, AfterViewInit { 
    
    
    // @ViewChild
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(
        private zone: NgZone,
        private _routerExtensions: RouterExtensions,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }
   
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectorRef.detectChanges();
    }

    ngOnInit() {

    }

    onToggleSideDrawer(): void {
        this.drawer.toggleDrawerState();
    }
}
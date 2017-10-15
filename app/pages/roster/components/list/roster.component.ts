import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { SearchBar } from "ui/search-bar";
import * as dialogs from "ui/dialogs";
var Sqlite = require("nativescript-sqlite");

import { AppConfig } from '../../../../shared/app-config';
import { RosterItem } from '../../../../shared/roster/rosterItem';
import { RosterService } from '../../../../shared/roster/roster.service';

@Component({
    moduleId: module.id,
    selector: "roster",
    templateUrl: "./roster.component.html",
    styleUrls: [ "./roster.component.css" ],
    providers: [ AppConfig, RosterService ]
})
export class RosterComponent implements OnInit, AfterViewInit { 
    private _database: any;
    localRosterItems: RosterItem[] = [];

    private _searchTerm: string = '';

    isLoading = false;
    isRosterLoaded = false;

    // @ViewChild
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(
        private zone: NgZone,
        private _routerExtensions: RouterExtensions,
        private _changeDetectorRef: ChangeDetectorRef,
        private _appConfig: AppConfig,
        private _rosterService: RosterService
    ) { }
   
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectorRef.detectChanges();
    }

    ngOnInit() {
        if (!this._appConfig.isConfigValid()) {
            this._routerExtensions.navigate(['/setup']);
        }

        this.initLocalDb();
    }

    public onToggleSideDrawer(): void {
        this.drawer.toggleDrawerState();
    }

    public onSyncRoster(): void {
        this._routerExtensions.navigate(['/roster/sync']);
    }

    public onSearchSubmit(args): void {
        let searchBar = <SearchBar>args.object;
        this._searchTerm = searchBar.text;
        searchBar.dismissSoftInput();
        
        this.refreshLocalRoster();
    }

    public onSearchClear(args): void {
        let searchBar = <SearchBar>args.object;
        searchBar.text = '';
        this._searchTerm = '';
        
        searchBar.dismissSoftInput();

        this.refreshLocalRoster();
    }

    onRosterItemSelected(args): void {
        let rosterItem = args.view.bindingContext;
        this._routerExtensions.navigate(['/roster/details', rosterItem.id]);
    }

    initLocalDb(): void {
        (new Sqlite('RailOps.db')).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS rosterItem(id TEXT PRIMARY KEY, road TEXT, number TEXT, type TEXT, length TEXT, color TEXT, comment TEXT)").then(id => {
                this._database = db;

                this.refreshLocalRoster();
            }, error => { 
                console.log('CREATE TABLE ERROR', error);
            })
        }, error => {
            console.log('OPEN DB ERROR', error);
        });
    }

    refreshLocalRoster(): void {
        console.log('REFRESH LOCAL ROSTER', this._searchTerm);

        this.isLoading = true;

        let query = 'SELECT * FROM rosterItem';
        if (this._searchTerm) {
            query = query + ' WHERE (id LIKE \'%' + this._searchTerm + '%\')';
            query = query + ' OR (type  LIKE \'%' + this._searchTerm + '%\')';
        }

        this._database.all(query)
            .then(rows => {
                this.localRosterItems = [];
                for (var row in rows) {
                    let item = new RosterItem();
                    item.id = rows[row][0];
                    item.road = rows[row][1];
                    item.number = rows[row][2];
                    item.type = rows[row][3];
                    item.length = rows[row][4];
                    item.color = rows[row][5];
                    item.comment = rows[row][6];

                    this.localRosterItems.push(item);
                }

                this.isRosterLoaded = true;
                this.isLoading = false;
            }, error => {
                console.error('SELECT ERROR', error);
                this.isLoading = false;
            })
    }
}
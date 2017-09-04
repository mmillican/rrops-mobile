import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import * as dialogs from "ui/dialogs";
var Sqlite = require("nativescript-sqlite");

import { RosterItem } from "../../shared/roster/rosterItem";
import { RosterService } from "../../shared/roster/roster.service";

@Component({
    selector: "roster",
    templateUrl: "pages/roster/roster.component.html",
    providers: [ RosterService ]
})
export class RosterComponent implements OnInit, AfterViewInit { 
    private _database: any;
    localRosterItems: RosterItem[] = [];

    isLoading = false;
    isRosterLoaded = false;

    // @ViewChild
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(
        private zone: NgZone,
        private _routerExtensions: RouterExtensions,
        private _changeDetectorRef: ChangeDetectorRef,
        private _rosterService: RosterService
    ) { }
   
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectorRef.detectChanges();
    }

    ngOnInit() {
        this.initLocalDb();
    }

    public onToggleSideDrawer(): void {
        this.drawer.toggleDrawerState();
    }

    public onSyncRoster(): void { 
        // TODO: Update existing items
        // TODO: Delete old items
        // TODO: Clear roster

        console.log('SYNC ROSTER');
        let insertCount = 0;
        
        this.isLoading = true;

        this._rosterService.getCars()
            .subscribe(rosterItems => {
                console.log('ITEMS IN REMOTE ROSTER', rosterItems.length);

                rosterItems.forEach(item => {
                    console.log('ROSTER ITEM', item.id);
                    this._database.get('SELECT * FROM rosterItem WHERE ID=?', [item.id])
                        .then(row => {
                            if (!row) {
                                console.log('ROSTER ID NOT FOUND', item.id);
                                this._database.execSQL("INSERT INTO rosterItem(id, road, number, type, length, color, comment) VALUES (?, ?, ?, ?, ?, ?, ?)",
                                    [item.id, item.road, item.number, item.type, item.length, item.color, item.comment ])
                                    .then(id => {
                                        console.log('INSERTED ROSTER ID', id);
                                        insertCount++;
                                    }, error => {
                                        console.error('INSERT ROSTER ITEM ERROR', error);
                                    })
                            } else { 
                                console.log('ROSTER ITEM FOUND', item.id);
                            }
                        })
                });

                dialogs.alert({
                    title: 'Roster updated',
                    message: insertCount + ' items added',
                    okButtonText: 'OK'
                })
                this.refreshLocalRoster();
            });
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
        console.log('REFRESH LOCAL ROSTER');

        this.isLoading = true;

        this._database.all('SELECT * FROM rosterItem')
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
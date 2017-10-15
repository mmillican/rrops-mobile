import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import * as dialogs from "ui/dialogs";
var Sqlite = require("nativescript-sqlite");

import { AppConfig } from '../../../../shared/app-config';
import { RosterItem } from '../../../../shared/roster/rosterItem';
import { RosterService } from '../../../../shared/roster/roster.service';

@Component({
    moduleId: module.id,
    selector: "roster-sync",
    templateUrl: "./sync.component.html", 
    providers: [ AppConfig, RosterService ]
})
export class RosterSyncComponent implements OnInit {
    private _database: any;
    localRosterItems: RosterItem[] = [];
    currentRosterCount: number = 0;

    isLoading = false;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _rosterService: RosterService
    ) { }

    ngOnInit() {
        this.initLocalDb();
    }

    public onSyncRoster(): void { 
        // TODO: Update existing items
        // TODO: Delete old items
        // TODO: Clear roster

        console.log('SYNC ROSTER');
        let insertCount = 0;
        let doneCount = 0, needsToBeDone;

        new Promise((resolve) => {
            const completed = function(error) {
                if (error) {
                    console.error('INSERT ROSTER ITEM ERROR', error);
                } else {
                    insertCount++;
                }
                doneCount++;
                if (doneCount === needsToBeDone) {
                    resolve();
                }
            };

            this.isLoading = true;

            this._rosterService.getCars()
                .subscribe(rosterItems => {
                    console.log('ITEMS IN REMOTE ROSTER', rosterItems.length);
                    needsToBeDone = rosterItems.length;

                    rosterItems.forEach(item => {
                        console.log('ROSTER ITEM', item.id);
                        this._database.get('SELECT * FROM rosterItem WHERE ID=?', [item.id])
                            .then(row => {
                                if (!row) { // item not found in local roster
                                    console.log('ROSTER ID NOT FOUND', item.id);
                                    this._database.execSQL("INSERT INTO rosterItem(id, road, number, type, length, color, comment) VALUES (?, ?, ?, ?, ?, ?, ?)",
                                        [item.id, item.road, item.number, item.type, item.length, item.color, item.comment ], completed)
                                        .then(id => {
                                            console.log('INSERTED ROSTER ID', id);
                                        }, error => {
                                            console.error('INSERT ROSTER ITEM ERROR', error);
                                        })
                                } else { 
                                    console.log('ROSTER ITEM FOUND', item.id);

                                    completed(null);
                                }
                                
                            })
                    });
                });
            }).then(() => {
                dialogs.alert({
                    title: 'Roster updated',
                    message: insertCount + ' items added',
                    okButtonText: 'OK'
                });

                this.getRosterCount();
            });
    }

    public onClearRoster(): void {
        dialogs.confirm({
            title: 'Clear Roster',
            message: 'Are you sure you want to clear the roster?',
            cancelButtonText: 'Cancel',
            okButtonText: 'Proceed',
        }).then(result => {
            if (result) { // clear
                this._database.execSQL("DELETE FROM rosterItem").then(id => {
                    this.getRosterCount();
                });
            }
        });
    }

    getRosterCount(): void {
        this._database.get('SELECT COUNT(1) FROM rosterItem')
            .then(row => {
                this.currentRosterCount = row[0];
            });
    }

    initLocalDb(): void {
        (new Sqlite('RailOps.db')).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS rosterItem(id TEXT PRIMARY KEY, road TEXT, number TEXT, type TEXT, length TEXT, color TEXT, comment TEXT)").then(id => {
                this._database = db;

                // this.refreshLocalRoster();
                this.getRosterCount();
            }, error => { 
                console.log('CREATE TABLE ERROR', error);
            })
        }, error => {
            console.log('OPEN DB ERROR', error);
        });
    }
}
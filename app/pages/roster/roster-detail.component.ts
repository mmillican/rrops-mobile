import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';

var Sqlite = require('nativescript-sqlite');

import { AppConfig } from '../../shared/app-config';
import { RosterItem } from '../../shared/roster/rosterItem';
import { RosterService } from '../../shared/roster//roster.service';

@Component({
    selector: 'roster-detail',
    templateUrl: 'pages/roster/roster-detail.component.html',
    styleUrls: [ 'pages/roster/roster-detail.component.css' ],
    providers: [ AppConfig, RosterService ]
})
export class RosterDetailComponent implements OnInit { 
    private _database: any;

    rosterItem: RosterItem = new RosterItem();

    isLoading = false;

    constructor(
        private _zone: NgZone,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private _changeDetectorRef: ChangeDetectorRef,
        private _appConfig: AppConfig,
        private _rosterService: RosterService
    ) { }

    ngOnInit(): void {
        let itemId = '';
        this._pageRoute.activatedRoute
            .switchMap((ar) => ar.params)
            .forEach((params) => { itemId = params["id"]; });

        console.log('view roster item', itemId);

        (new Sqlite('RailOps.db')).then(db => {
            
            db.get('SELECT * FROM rosterItem WHERE ID=?', [ itemId ])
                .then(row => {
                    if (row) {
                        this.rosterItem = new RosterItem();           
                        this.rosterItem.id = row[0];
                        this.rosterItem.road = row[1];
                        this.rosterItem.number = row[2];
                        this.rosterItem.type = row[3];
                        this.rosterItem.length = row[4];
                        this.rosterItem.color = row[5];
                        this.rosterItem.comment = row[6];
                    } else{
                        this._routerExtensions.back();
                    }
                });
        })
    }

    
}
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { AppConfig } from "../app-config";
import { Config } from "../config";
import { Manifest, ManifestLocation, LocationTrack, RosterItemMove } from "./manifest"
import { RosterItem, Car, Engine } from "../roster/rosterItem";


@Injectable()
export class ManifestService {
    private _config: Config;

    constructor(
        private http: Http,
        appConfig: AppConfig
    ) { 
        this._config = appConfig.getConfig();
    }

    getTrainManifest(trainId: string) { 
        let headers = new Headers();

        return this.http.get(this._config.opsApiUrl + "manifest/" + trainId + "?format=json")
            .map(res => res.json())
            .map(data => this.buildManifest(data))
            .catch(this.handleErrors);
    }

    private buildManifest(data): Manifest {
        let manifest = new Manifest(data.name);
        manifest.description = data.description;

        data.locations.forEach(locEle => {
            var manLoc = this.buildManifestLocation(locEle);
            manifest.manifestLocations.push(manLoc);
        });


        return manifest;
    }

    private buildManifestLocation(locData): ManifestLocation { 
        let manLoc = new ManifestLocation(locData.id, locData.name);
        manLoc.description = locData.description;
        manLoc.departureTime = locData.departureTime;
        manLoc.trainDirection = locData.trainDirection;
        manLoc.weight = locData.weight;

        // apparently length can be null...
        if (locData.length) {
            manLoc.length = locData.length.length + ' ' + locData.length.unit;
        }

        if (locData.engines.add.length > 0) {
            locData.engines.add.forEach(item => {
                let move = this.buildRosterItemMove(item);
                manLoc.pickUps.push(move);
            })
        }
        if (locData.cars.add.length > 0) { 
            locData.cars.add.forEach(item => { 
                let move = this.buildRosterItemMove(item);
                manLoc.pickUps.push(move);
            });
        }
        if (locData.engines.remove.length > 0) {
            locData.engines.remove.forEach(item => { 
                let move = this.buildRosterItemMove(item);
                manLoc.setOuts.push(move);
            });
        }
        if (locData.cars.remove.length > 0) { 
            locData.cars.remove.forEach(item => { 
                let move = this.buildRosterItemMove(item);
                manLoc.setOuts.push(move);
            });
        }

        console.log(manLoc.name + ': pickups: ' + manLoc.pickUps.length);
        
        return manLoc;
    }

    private buildRosterItemMove(data): RosterItemMove<RosterItem> { 
        let move = new RosterItemMove();

        move.item = this.buildRosterItem(data);
        
        if (data.location) {
            move.location = this.buildLocationTrack(data.location);
        }

        if (data.destination) {
            move.destination = this.buildLocationTrack(data.destination);
        }

        return move;
    }

    private buildRosterItem(data): RosterItem { 
        let item = new RosterItem();
        item.id = data.id;
        item.number = data.number;
        item.road = data.road;
        item.type = data.type;
        item.length = data.length;
        item.color = data.color;

        return item;
    }

    private buildLocationTrack(data): LocationTrack { 
        var locTrack = new LocationTrack();
        locTrack.locationId = data.id;
        locTrack.locationName = data.name;
        locTrack.trackId = data.track.id;
        locTrack.trackName = data.track.name;
        
        return locTrack;
    }

    private handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}
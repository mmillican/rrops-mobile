import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Config } from "../config";
import { Manifest, ManifestLocation, LocationTrack, RosterItemMove } from "./manifest"
import { Car, Engine } from "../roster/rosterItem";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class ManifestService {
    constructor(private http: Http) { }

    getTrainManifest(trainId: string) { 
        let headers = new Headers();

        return this.http.get(Config.opsApiUrl + "manifest/" + trainId + "?format=json")
            .map(res => res.json())
            .map(data => this.buildManifest(data))
            .catch(this.handleErrors);
    }

    private buildManifest(data): Manifest {
        let manifest = new Manifest(data.name);
        manifest.description = data.description;

        console.log(data.locations.length + ' locs for man');

        // Things seem to not like this... guessing becaus async... 

        // data.locations.forEach(locEle => {
        //     var manLoc = this.buildManifestLocation(locEle);
        //     manifest.manifestLocations.push(manLoc);
        // });


        return manifest;
    }

    private buildManifestLocation(locData): ManifestLocation { 
        let manLoc = new ManifestLocation(locData.id, locData.name);
        manLoc.comment = locData.comment;
        manLoc.departureTime = locData.departureTime;
        manLoc.trainDirection = locData.trainDirection;
        manLoc.length = locData.length.length;
        manLoc.weight = locData.weight;
        
        console.log('built ' + manLoc.name);
        // cars/engines below...
        return manLoc;
    }

    private handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}
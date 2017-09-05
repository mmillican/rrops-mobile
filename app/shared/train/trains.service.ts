import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { AppConfig } from "../app-config";
import { Config } from "../config";
import { Train } from "./train";

@Injectable()
export class TrainService {
    private _config: Config;
    
    constructor(
        private http: Http,
        appConfig: AppConfig
    ) { 
        this._config = appConfig.getConfig();
    }

    load() {
        let headers = new Headers();
        console.log("loading trains...");

        return this.http.get(this._config.apiUrl + "trains")
            .map(res => res.json())
            .map(data =>{
                let trainList = [];
                data.forEach((td) => {
                    let train = this.populateTrain(td.data);
                    // train.id = td.data.id;
                    // train.name = td.data.name;
                    // train.statusCode = td.data.statusCode;
                    trainList.push(train);
                    // trainList.push(new Train(td.data.id, td.data.name, td.data.statusCode));
                });
                return trainList;
            })
            .catch(this.handleErrors);
    }

    getTrainById(id: string) {
        let headers = new Headers();
        console.log('loading train ' + id);

        return this.http.get(this._config.apiUrl + 'train/' + id)
            .map(res => res.json())
            .map(td => this.populateTrain(td.data))
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }

    populateTrain(data) {
        let train = new Train();
        train.id = data.id;
        
        train.name = data.name;
        train.description = data.description;
        train.comment = data.comment;

        train.departureTime = data.departureTime;

        train.routeId = data.routeId;
        train.routeName = data.routeName;

        train.currentLocationId = data.locationId;
        train.currentLocation = data.location;

        train.departLocationName = data.trainDepartsName;
        train.terminateLocationName = data.trainTerminatesName;

        train.statusCode = data.statusCode;
        train.status = data.status;

        train.length = data.length;
        train.weight = data.weight;

        train.leadEngine = data.leadEngine;

        train.locations = data.locations;

        return train;
    }
}
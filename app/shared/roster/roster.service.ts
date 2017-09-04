import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Config } from "../config";
import { RosterItem } from "./rosterItem";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class RosterService { 
    constructor(private http: Http) { }

    getCars(): Observable<RosterItem[]> { 
        console.log('GET CARS');

        let headers = new Headers();

        return this.http.get(Config.apiUrl + "cars")
            .map(res => res.json())
            .map(data => {
                let items = [];

                data.forEach(car => {
                    let item = new RosterItem();
                    item.id = car.data.id;
                    item.number = car.data.number;
                    item.road = car.data.road;
                    item.type = car.data.type;
                    item.color = car.data.color;
                    item.length = car.data.length;
                    item.comment = car.data.comment;    

                    items.push(item);
                });               

                return items;
            })
            .catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Config } from "../config";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
var Sqlite = require("nativescript-sqlite");

import { RosterItem } from "./rosterItem";
import { RosterService } from "./roster.service";

@Injectable()
export class LocalRosterService {
    private _database: any;
    
    constructor() {
        
    }

    
}
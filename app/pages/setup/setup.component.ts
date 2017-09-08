import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AppConfig } from "../../shared/app-config";
import { Config } from "../../shared/config";

@Component({
    selector: "setup",
    templateUrl: "pages/setup/setup.component.html",
    styleUrls: ["pages/setup/setup.component.css"],
    providers: [AppConfig]
})
export class SetupComponent implements OnInit {
    apiUrl: string = '';
    opsApiUrl: string = '';
    
    constructor(
        private _appConfig: AppConfig,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit() {
        let config = this._appConfig.getConfig();

        this.apiUrl = config.apiUrl;
        this.opsApiUrl = config.opsApiUrl;
    }

    saveConfig(): void { 
        let config = new Config();
        config.apiUrl = this.apiUrl;
        config.opsApiUrl = this.opsApiUrl;

        this._appConfig.setConfig(config);

        this._routerExtensions.back();
    }
}
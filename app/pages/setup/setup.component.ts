import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AppConfig } from "../../shared/app-config";
import { Config } from "../../shared/config";

@Component({
    selector: "setup",
    templateUrl: "pages/setup/setup.component.html",
    providers: [AppConfig]
})
export class SetupComponent implements OnInit {
    config: Config;
    
    constructor(
        private _appConfig: AppConfig,
        private _routerExtensions: RouterExtensions
    ) {
        this.config = _appConfig.getConfig();
     }

    ngOnInit() {

    }

    saveConfig(apiUrl: string, opsApiUrl: string): void { 
        let config = new Config();
        config.apiUrl = apiUrl;
        config.opsApiUrl = opsApiUrl;

        this._appConfig.setConfig(config);

        this._routerExtensions.back();
    }
}
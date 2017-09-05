import { Injectable } from "@angular/core";
let LS = require("nativescript-localstorage");

import { Config } from "./config";

@Injectable()
export class AppConfig {
    isConfigValid(): boolean {
        var config = this.getConfig();

        console.log('CONFIG', JSON.stringify(config));
        
        return config.apiUrl != null 
            && config.opsApiUrl != null;
    }

    getConfig(): Config {
        let config = new Config();
        config.apiUrl = LS.getItem("RROps.apiUrl");
        config.opsApiUrl = LS.getItem("RROps.opsApiUrl");

        return config;
    }

    setConfig(config: Config): void {
        LS.setItem("RROps.apiUrl", config.apiUrl);
        LS.setItem("RROps.opsApiUrl", config.opsApiUrl);
    }
}
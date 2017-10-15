import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { OpsRoutingModule, OpsNavigatableComponents } from './ops-routing.module';

import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-telerik-ui/listview/angular";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        OpsRoutingModule,
        TNSFontIconModule.forRoot({
            'fa': './assets/font-awesome.css'
        }),
        NativeScriptUIListViewModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        ...OpsNavigatableComponents
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OpsModule { }
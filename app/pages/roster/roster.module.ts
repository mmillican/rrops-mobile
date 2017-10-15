import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { RosterRoutingModule, RosterNavigatableComponents } from './roster-routing.module';

import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-telerik-ui/listview/angular";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { RosterComponent } from './components/list/roster.component';
import { RosterSyncComponent } from './components/sync/sync.component';
import { RosterDetailComponent } from './components/detail/detail.component';

@NgModule({
    imports: [
        RosterRoutingModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        TNSFontIconModule.forRoot({
            'fa': './assets/font-awesome.css'
        }),
        NativeScriptUIListViewModule,
        NativeScriptUISideDrawerModule,
    ],
    declarations: [
        ...RosterNavigatableComponents
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RosterModule { }
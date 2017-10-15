import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NSModuleFactoryLoader, NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { AppComponent } from "./app.component";
import { AppRoutingModule, navigatableComponents } from "./app.routing";

import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-telerik-ui/listview/angular";

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    TNSFontIconModule.forRoot({
			'fa': './assets/font-awesome.css'
		}),
    NativeScriptUIListViewModule,
    NativeScriptUISideDrawerModule,
    AppRoutingModule
  ],
  providers: [
      { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule {}

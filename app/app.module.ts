import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

import { AccordionModule } from "nativescript-accordion/angular";

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    TNSFontIconModule.forRoot({
			'fa': './assets/font-awesome.css'
		}),
    NativeScriptRouterModule.forRoot(routes),
    AccordionModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

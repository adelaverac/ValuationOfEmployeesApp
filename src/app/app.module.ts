import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { HttpClientModule } from '@angular/common/http';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { TabsPageRoutingModule } from './pages/tabs/tabs.router.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TabsPageRoutingModule,
    ComponentsModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '_myDb',
      driverOrder: ['localstorage']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SpinnerDialog,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

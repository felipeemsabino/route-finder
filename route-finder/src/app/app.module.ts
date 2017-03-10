import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from '../providers/auth-service';

import { Login } from '../pages/login/login';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { PagesMapa2Page } from '../pages/pages-mapa2/pages-mapa2';
import { PagesMapa3Page } from '../pages/pages-mapa3/pages-mapa3';
import { GasStationMapPage } from '../pages/pages-mapa3/tabs/gas-station-map/gas-station-map';
import { GasStationListPage } from '../pages/pages-mapa3/tabs/gas-station-list/gas-station-list';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Page1,
    Page2,
    PagesMapa2Page,
    PagesMapa3Page,
    GasStationMapPage,
    GasStationListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Page1,
    Page2,
    PagesMapa2Page,
    PagesMapa3Page,
    GasStationMapPage,
    GasStationListPage
  ],
  providers: [AuthService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

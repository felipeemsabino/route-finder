import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProvidersGoogleMaps } from '../../providers/providers-google-maps';
import { NavController, LoadingController } from 'ionic-angular';
import { Posto } from '../../classes/posto';
import { GasStationMapPage } from '../../pages/pages-mapa3/tabs/gas-station-map/gas-station-map';
import { GasStationListPage } from '../../pages/pages-mapa3/tabs/gas-station-list/gas-station-list';
declare var google;
/*
  Generated class for the PagesMapa3 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pages-mapa3',
  template: `<ion-tabs>
              <ion-tab tabIcon="map" [root]="tab1"></ion-tab>
              <ion-tab tabIcon="list" [root]="tab2"></ion-tab>
            </ion-tabs>`
})
export class PagesMapa3Page {

  tab1: any;
  tab2: any;

  constructor() {
    this.tab1 = GasStationMapPage;
    this.tab2 = GasStationListPage;
  }
}

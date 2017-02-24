import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

/*
  Generated class for the ProvidersGoogleMaps provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProvidersGoogleMaps {

  constructor(public http: Http) {
    console.log('Hello ProvidersGoogleMaps Provider');
  }

  /* Loads the map and set the current position
  * Reference for passing functions as parameters:
  * http://stackoverflow.com/questions/14638990/are-strongly-typed-functions-as-parameters-possible-in-typescript
  *
  */
  getCurrentPosition (callback: (result: any) => any) {
    Geolocation.getCurrentPosition().then((resp) => {
      console.log('Getting location:');
      console.log('Lat ' + resp.coords.latitude);
      console.log('Lng ' + resp.coords.longitude);
      callback(resp.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  // Watch the user position in the map
  watchPosition () {
    let watch = Geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('Watching location:');
      console.log('Lat ' + data.coords.latitude);
      console.log('Lng ' + data.coords.longitude);
    });
  }
}

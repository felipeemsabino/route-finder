import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProvidersGoogleMaps } from '../../providers/providers-google-maps';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [ProvidersGoogleMaps]
})
export class Page1 {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, private gMapsProvider: ProvidersGoogleMaps) {

  }

  ionViewWillEnter(){
    this.loadMap();
  }

  loadMap(){
    try {
      let latLng = new google.maps.LatLng(-34.9290, 138.6010);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.showUserPosition();
    } catch (ex) {
      console.log(ex);
    }
  }

  showUserPosition() {
    this.gMapsProvider.getCurrentPosition(this.createMarker);
  }

  setMapCenter (coords: any) {
    this.map.setCenter({lat: coords.latitude, lng: coords.longitude});
  }

  createMarker = (coords: any) : void => {
    this.setMapCenter(coords);

    console.log("Mostrando coords encontradas -> lat: "+coords.latitude +" lng: "+ coords.longitude);
    
    let latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);
  };

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}

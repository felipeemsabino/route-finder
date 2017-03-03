import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProvidersGoogleMaps } from '../../providers/providers-google-maps';
import { NavController, LoadingController } from 'ionic-angular';
import { Posto } from '../../classes/posto';

declare var google;
/*
  Generated class for the PagesMapa2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pages-mapa2',
  templateUrl: 'pages-mapa2.html',
  providers: [ProvidersGoogleMaps]
})
export class PagesMapa2Page {

  constructor(public navCtrl: NavController, private gMapsProvider: ProvidersGoogleMaps,
    public loadingCtrl: LoadingController) {

  }

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  gasStationsList: Posto[] = [];
  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  ionViewWillEnter(){
    this.loadGasStations();
    this.loadMap();
    document.getElementsByName("bubbles")[0].style.display = "none";
  }

  loadGasStations () {
    console.log("antes");

    this.gasStationsList.push(new Posto("Posto Shell Mario Werneck",
      "Av. Professor Mario Werneck, 786 - CEP 31306422", "-19.969330", "-43.963176", 1.1,"S",3.397));

    this.gasStationsList.push(new Posto("Posto Br Buritis",
      "Av. Engenheiro Carlos Goulart, 273 - CEP 30750012", "-19.969270", "-43.960848", 0.8,"S",3.478));

    console.log("dps");
  }

  loadMap(){
    try {
      //this inside the gmap function is referring to the function context and not your class.
      var currentThis = this;

      let latLng = new google.maps.LatLng(-34.9290, 138.6010);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('zoom_changed', function() {
        currentThis.updatePostosList();
      });

      this.map.addListener('dragend', function() {
        currentThis.updatePostosList();
      });

      this.showUserPosition();
    } catch (ex) {
      console.log(ex);
    }
  }

  updatePostosList() {
    // this.loading.present();
    document.getElementsByName("bubbles")[0].style.display = "block";
    console.log(this.map.getBounds());
    setTimeout(() => {
      //this.loading.dismiss();
      document.getElementsByName("bubbles")[0].style.display = "none";
    }, 1500);
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

    this.createMarkersAux();
  };

  createMarkersAux () {
    for(var i = 0;i < this.gasStationsList.length;i++) {

      console.log("Mostrando coords encontradas -> lat: "+this.gasStationsList[i].coordenadaX +" lng: "+
      this.gasStationsList[i].coordenadaY);

      let latLng = new google.maps.LatLng(this.gasStationsList[i].coordenadaX,
        this.gasStationsList[i].coordenadaY);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      let content = "<h4>"+this.gasStationsList[i].nome+"<br> Preço: "
      +this.gasStationsList[i].preco+"!<br> Distância: "+this.gasStationsList[i].distancia+"</h4>";

      this.addInfoWindow(marker, content);
    }
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}

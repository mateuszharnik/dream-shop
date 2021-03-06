import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Map } from '@models/index';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() isAdmin = false;
  @Input() mapData: Map = null;
  @Output() whenMapClick: EventEmitter<any> = new EventEmitter<any>();

  marker = null;
  map = null;
  position = null;
  listener = null;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.calculatePosition();
  }

  ngOnChanges() {
    if (this.map) {
      this.calculatePosition();
      this.map.removeLayer(this.marker);
      this.setMarker(this.position);
    }
  }

  ngAfterViewInit() {
    if (this.position) {
      this.initMap(this.position);

      if (this.map && this.isAdmin) {
        this.listener = this.renderer.listen(this.map, 'click', (event: Event) => {
          this.getPosition(event);
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener();
    }
  }

  initMap(position) {
    this.map = L.map('map').setView(position, 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.setMarker(position);
  }

  setMarker(position) {
    this.marker = L.marker(position, {
      title: 'Tutaj znajduje się nasz sklep!',
      alt: 'Znacznik',
      icon: L.icon({
        iconUrl: '../../../assets/img/marker.png',
        iconSize: [20, 34],
        iconAnchor: [10, 17],
      }),
    }).addTo(this.map);
  }

  calculatePosition() {
    const position = this.mapData.latlng.replace(/[\(\)]/g, '').split(', ').map(value => parseFloat(value));
    this.position = position;
  }

  getPosition(event) {
    const { lat, lng } = event.latlng;

    L.popup()
      .setLatLng(event.latlng)
      .setContent(`(${lat}, ${lng})`)
      .openOn(this.map);

    this.whenMapClick.emit({ lat, lng });
  }
}

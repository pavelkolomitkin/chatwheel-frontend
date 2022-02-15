import { Component, OnInit } from '@angular/core';
import {MapComponentInterface} from "../MapComponentInterface";
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj.js';
import {Geolocation} from "../../../../core/data/models/geolocation.model";

@Component({
  selector: 'app-map-component-base',
  templateUrl: './map-component-base.component.html',
  styleUrls: ['./map-component-base.component.css']
})
export class MapComponentBaseComponent implements MapComponentInterface {

  protected overlay: Overlay;

  public setOverlay(overlay: Overlay) {
    this.overlay = overlay;
  }

  updatePosition(location: Geolocation)
  {
    const position = fromLonLat([location.longitude, location.latitude]);
    this.overlay.setPosition(position);
  }
}

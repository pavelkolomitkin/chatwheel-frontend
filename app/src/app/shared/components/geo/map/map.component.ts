import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type, ViewChild, ViewContainerRef
} from '@angular/core';

import {Map, View} from 'ol';
import Overlay from 'ol/Overlay';
import {fromLonLat, toLonLat, transformExtent } from 'ol/proj.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {Geolocation} from "../../../../core/data/models/geolocation.model";
import {MapViewBox} from "../../../data/model/map-view-box.model";
import {MapEntityLayout} from "../map-entity-layout";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Output('onSelectLocation') selectLocationEmitter: EventEmitter<Geolocation> = new EventEmitter<Geolocation>();
  @Output('onMove') moveEmitter: EventEmitter<MapViewBox> = new EventEmitter<MapViewBox>();
  @Output('onReady') readyEmitter: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainer: ViewContainerRef

  @Input() defaultCenter: Geolocation;

  @Input() defaultZoom: number;

  map: Map;

  layout: MapEntityLayout;

  constructor(private componentResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      overlays: [],
      view: new View({
        center: fromLonLat([37.41, 8.82]),
        zoom: 4
      }),
      controls: []
    });

    if (this.defaultCenter)
    {
      this.setCenter(this.defaultCenter);
    }

    if (this.defaultZoom)
    {
      this.setZoom(this.defaultZoom)
    }

    this.map.on('singleclick', this.onMapClickHandler);
    this.map.on('moveend', this.onMoveEndHandler);

    this.layout = new MapEntityLayout(this, this.componentResolver);

    this.readyEmitter.emit();
  }

  setCenter(location: Geolocation)
  {
    this
      .map
      .getView()
      .setCenter(fromLonLat([ location.longitude, location.latitude ]));
  }

  setZoom(zoom: number)
  {
    this.map.getView().setZoom(zoom);
  }

  onMapClickHandler = (event) =>
  {
    const lonLatCoordinate = toLonLat(event.coordinate);

    const location: Geolocation = {
      latitude: lonLatCoordinate[1],
      longitude: lonLatCoordinate[0]
    };

    this.selectLocationEmitter.emit(location);
  }

  onMoveEndHandler = (event) =>
  {
    const box: MapViewBox = this.getViewBox();

    this.moveEmitter.emit(box);
  }

  getZoom()
  {
    return this.map.getView().getZoom();
  }

  getViewBox(): MapViewBox
  {
    let extent = this.map.getView().calculateExtent(this.map.getSize());

    extent = transformExtent(extent,'EPSG:3857', 'EPSG:4326');

    const result = {
      topLeft: {
        latitude: extent[3],
        longitude: extent[0]
      },
      bottomRight: {
        latitude: extent[1],
        longitude: extent[2]
      },
      zoom: this.getZoom()
    };

    return result;
  }

  ngOnDestroy() {

    this.map.un('singleclick', this.onMapClickHandler);
    this.map.un('moveend', this.onMoveEndHandler);

  }

  addMark<C>(component: Type<C>, location: Geolocation): ComponentRef<C>
  {
    return this.layout.addEntity(component, location);
  }

  removeMark<C>(component: ComponentRef<C>)
  {
    this.layout.removeEntity(component);
  }

  removeAllMarks()
  {
    this.layout.removeAllEntities();
  }
}

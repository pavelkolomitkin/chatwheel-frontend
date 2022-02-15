import {
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
    const factory = this.componentResolver.resolveComponentFactory(component);
    const result = this.mapContainer.createComponent(factory);

    const overlayPosition = fromLonLat([ location.longitude, location.latitude ]);

    const overlay: Overlay =  new Overlay({
      element: result.location.nativeElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    overlay.setPosition(overlayPosition);

    this.map.addOverlay(overlay);
    //@ts-ignore
    result.instance.setOverlay(overlay);

    return result;
  }

  removeMark<C>(component: ComponentRef<C>)
  {
    const componentIndex: number = this.mapContainer.indexOf(component.hostView);
    if (componentIndex !== -1)
    {
      this.mapContainer.remove(componentIndex);
    }
  }

  removeAllMarks()
  {
    this.mapContainer.clear();
  }
}

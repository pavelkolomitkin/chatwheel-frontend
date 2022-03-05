import {ComponentFactoryResolver, ComponentRef, Type} from '@angular/core';
import Overlay from 'ol/Overlay';
import {fromLonLat } from 'ol/proj.js';
import {environment} from '../../../../environments/environment';
import {MapComponent} from "./map/map.component";
import {MapPinGroupComponent} from "./map-pin-group/map-pin-group.component";
import {Geolocation} from "../../../core/data/models/geolocation.model";

export class MapEntityLayout {

    pinGroups: Array<ComponentRef<MapPinGroupComponent>> = [];

    constructor(private map: MapComponent, private componentResolver: ComponentFactoryResolver)
    {

    }

    addEntity<C>(component: Type<C>, location: Geolocation): ComponentRef<C>
    {
        // find a nearest balloon group on the map
        let group: ComponentRef<MapPinGroupComponent> = this.getNearestPinGroup(location);

        // if there isn't anyone
        if (!group)
        {
            // create a new balloon group
            group = this.createGroupOverlay(location);
            // add it on the map
        }


        // add a new component to the balloon group
        const result = group.instance.createChildPin(component);
            // the new target component should be hosted by the balloon group component

        // return the result
        return result;

    }

    removeEntity<C>(component: ComponentRef<C>)
    {
        let result = false;

        for (let i = 0; i < this.pinGroups.length; i++)
        {
            if (this.pinGroups[i].instance.removeChildPin(component))
            {
                if (this.pinGroups[i].instance.getChildNumber() === 0)
                {
                    const componentIndex = this.map.mapContainer.indexOf(this.pinGroups[i].hostView);
                    if (componentIndex !== -1)
                    {
                        this.map.mapContainer.remove(componentIndex);
                    }

                    this.pinGroups.splice(i, 1);
                }

                result = true;

                break;
            }
        }


        return result;
    }

    removeAllEntities()
    {
        this.pinGroups = [];
        this.map.mapContainer.clear();
    }

    private getNearestPinGroup(location: Geolocation): ComponentRef<MapPinGroupComponent> | null
    {
        let result = null;

        for (let i = 0; i < this.pinGroups.length; i++)
        {
            if (this.arePointsNear(location, this.pinGroups[i].instance.location))
            {
                result = this.pinGroups[i];

                break;
            }
        }

        return result;
    }

    private arePointsNear(location1: Geolocation, location2: Geolocation) : boolean
    {
        let result = false;

        if (
            (Math.abs(location1.latitude - location2.latitude) <= environment.nearGeoCoordinateMaxDelta) &&
            (Math.abs(location1.longitude - location2.longitude) <= environment.nearGeoCoordinateMaxDelta)
        )
        {
            result = true;
        }

        return result;
    }


    private createGroupOverlay(location: Geolocation): Overlay
    {
        const factory = this.componentResolver.resolveComponentFactory(MapPinGroupComponent);
        const result = this.map.mapContainer.createComponent(factory);
        result.instance.location = location;

        const position = fromLonLat([location.longitude, location.latitude]);

        const overlay: Overlay = this.createOverlay(result);
        overlay.setPosition(position);

        this.map.map.addOverlay(overlay);

        this.pinGroups.push(result);

        return result;
    }

    private createOverlay(component: ComponentRef<any>): Overlay
    {
        const result = new Overlay({
            element: component.location.nativeElement,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        return result;
    }
}

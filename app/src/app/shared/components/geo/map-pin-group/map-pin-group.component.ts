import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, ElementRef, HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Geolocation} from '../../../../core/data/models/geolocation.model';

@Component({
  selector: 'app-map-pin-group',
  templateUrl: './map-pin-group.component.html',
  styleUrls: ['./map-pin-group.component.css']
})
export class MapPinGroupComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  @ViewChild('layout', { read: ElementRef }) layout: ElementRef;

  @Input()
  location: Geolocation;

  childNumber: number = 0;

  pinsVisible: boolean = true;

  constructor(public componentResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  hasChildPin(component: ComponentRef<any>): boolean
  {
    return (this.container.indexOf(component.hostView) !== -1);
  }

  getChildNumber()
  {
    return this.container.length;
  }

  createChildPin(component: any): ComponentRef<any>
  {
    const factory = this.componentResolver.resolveComponentFactory(component);
    const result = this.container.createComponent(factory);

    this.container.element.nativeElement.appendChild(result.location.nativeElement);
    this.childNumber = this.childNumber + 1;

    this.updatePinsVisibility();

    return result;
  }

  removeChildPin(component: ComponentRef<any>): boolean
  {
    let result = false;

    const componentIndex = this.container.indexOf(component.hostView);
    if (componentIndex !== -1)
    {
      this.container.remove(componentIndex);

      result = true;
      this.childNumber = this.childNumber - 1;

      this.updatePinsVisibility();
    }

    return result;
  }

  onNumberClickHandler(event)
  {
    this.pinsVisible = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClickHandler(event)
  {
    if (
      (this.layout.nativeElement.contains(event.target))
      || (this.layout.nativeElement === event.target)
    )
    {
      return;
    }

    this.updatePinsVisibility();

  }

  updatePinsVisibility()
  {
    if (this.childNumber > 1)
    {
      this.pinsVisible = false;
    }
  }

}

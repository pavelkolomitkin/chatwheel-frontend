import {Component, Input, OnInit} from '@angular/core';
import {Country} from "../../../../../../core/data/models/country.model";

@Component({
  selector: 'app-selected-country-view',
  templateUrl: './selected-country-view.component.html',
  styleUrls: ['./selected-country-view.component.css']
})
export class SelectedCountryViewComponent implements OnInit {

  @Input() label: string;

  @Input() country: Country;

  @Input() noSelectedMessage: string

  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Country} from "../../../../core/data/models/country.model";

@Component({
  selector: 'app-country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.css']
})
export class CountryFlagComponent implements OnInit {

  @Input() country: Country;

  constructor() { }

  ngOnInit(): void {
  }

}

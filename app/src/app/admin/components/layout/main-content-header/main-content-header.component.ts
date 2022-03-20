import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-content-header',
  templateUrl: './main-content-header.component.html',
  styleUrls: ['./main-content-header.component.css']
})
export class MainContentHeaderComponent implements OnInit {

  @Input() icon: string;

  @Input() header: string;

  @Input() subHeader: string = null;


  constructor() { }

  ngOnInit(): void {
  }

}

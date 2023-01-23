import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() 'icon-class': string = '';
  @Input() name: string;
  @Input() solid: boolean = false;
  class: string = '';

  constructor() { }

  ngOnInit(): void {
    this.class = this['icon-class'];
  }

}

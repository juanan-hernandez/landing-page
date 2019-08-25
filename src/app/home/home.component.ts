import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() { }
  expand = [false, false, false, false];

  ngOnInit() {
  }

  showDiv(id) {
    this.expand[id] = !this.expand[id];
    const elementId = 'panel-' + id;
    if (this.expand[id] === true) {
      document.getElementById(elementId).style.maxHeight = '1000px';
    } else {
      document.getElementById(elementId).style.maxHeight = '';
    }
  }
}

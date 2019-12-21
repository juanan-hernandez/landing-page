import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }  ];

  constructor(@Inject(LOCALE_ID) protected localeId: string) {
  }

  ngOnInit() {
  }

}

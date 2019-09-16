import { Component, LOCALE_ID, Inject  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'landing-page';
  languageList = [
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Spanish' }  ];

  constructor(@Inject(LOCALE_ID) protected localeId: string) {
  }
}


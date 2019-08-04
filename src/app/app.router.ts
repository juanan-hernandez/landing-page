import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent} from './contact/contact.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(appRoutes);

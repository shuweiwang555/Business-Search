import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchListComponent } from './search-list/search-list.component';
import { MyBookingsListComponent } from './my-bookings-list/my-bookings-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnersAngularModule } from 'spinners-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { GoogleMapsModule } from '@angular/google-maps'
import { enable } from 'node_modules_bk/@colors/colors';


const appRoutes: Routes = [
  { path: 'search', component: SearchListComponent },
  { path: 'bookings', component: MyBookingsListComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchListComponent,
    MyBookingsListComponent,
    PageNotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    SpinnersAngularModule,
    MatTabsModule,
    GoogleMapsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, anchorScrolling: "enabled", scrollPositionRestoration: "enabled", scrollOffset: [0, 64] }
    ),
    BrowserAnimationsModule,
    NgbModule,
    // NgbModal
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
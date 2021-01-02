import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './navbar/navbar.component';
import {PositiveNegativeNumberPipe} from './util/positive-negative-number.pipe';
import {MapComponent} from './map/map.component';
import {IdRegionePipe} from './util/id-regione-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PositiveNegativeNumberPipe,
    MapComponent,
    IdRegionePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    PositiveNegativeNumberPipe,
    IdRegionePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

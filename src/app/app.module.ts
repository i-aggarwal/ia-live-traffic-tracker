import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapModule } from './geographies/components/maps/maps.module';
import { MapsModule } from './geographies/containers/maps/maps.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { LiveTraffic } from './live-trafic/services/live-trafic.service';
import { HttpClientModule } from '@angular/common/http';
import { TrafficMapperModule } from './live-trafic/containers/traffic-mapper/traffic-mapper.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MapModule,
    MapsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    TrafficMapperModule
  ],
  providers: [LiveTraffic],
  bootstrap: [AppComponent]
})
export class AppModule {}

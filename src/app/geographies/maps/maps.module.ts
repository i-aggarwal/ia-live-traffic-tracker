import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps.component';
import { MapModule } from '../../components/maps/maps.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../store/reducers';
import { effects } from '../store/effects';
import { GeojsonService } from '../services/geojson.service';

@NgModule({
  imports: [
    CommonModule,
    MapModule,
    StoreModule.forFeature('geo-details', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [MapsComponent],
  exports: [MapsComponent],
  providers: [GeojsonService]
})
export class MapsModule { }

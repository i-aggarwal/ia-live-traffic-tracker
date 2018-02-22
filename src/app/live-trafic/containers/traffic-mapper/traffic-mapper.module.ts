import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../../store/reducers';
import { effects } from '../../store/effects';
import { TrafficMapperComponent } from './traffic-mapper.component';
import { MapsModule } from '../../../geographies/containers/maps/maps.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('live-traffic', reducers),
    EffectsModule.forFeature(effects),
    MapsModule
  ],
  declarations: [TrafficMapperComponent],
  exports: [TrafficMapperComponent],
  providers: [TrafficMapperComponent]
})
export class TrafficMapperModule {}

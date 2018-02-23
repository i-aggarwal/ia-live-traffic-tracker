import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapBuilderComponent } from './maps.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MapBuilderComponent],
  exports: [MapBuilderComponent]
})
export class MapModule {}

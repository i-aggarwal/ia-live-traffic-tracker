import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapBuilderComponent } from './maps.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [MapBuilderComponent],
  exports: [MapBuilderComponent]
})
export class MapModule {}

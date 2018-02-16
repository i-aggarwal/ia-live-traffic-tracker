import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfoModule } from './sfo/sfo.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [SfoModule]
})
export class MapModule { }

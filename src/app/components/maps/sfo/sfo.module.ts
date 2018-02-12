import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfoComponent } from './sfo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SfoComponent],
  exports: [SfoComponent]
})
export class SfoModule { }

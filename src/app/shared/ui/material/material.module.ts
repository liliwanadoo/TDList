import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatIconModule, MatIcon } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    MatInputModule,
    MatIcon
  ]
})
export class MaterialModule { }

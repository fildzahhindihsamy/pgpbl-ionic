import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPointPageRoutingModule } from './edit-point-routing.module';

import { EditPointPage } from './edit-point.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditPointPageRoutingModule,
    EditPointPage
  ],
  declarations: []
})
export class EditPointPageModule {}

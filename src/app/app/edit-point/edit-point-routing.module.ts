import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPointPage } from './edit-point.page';

const routes: Routes = [
  {
    path: '',
    component: EditPointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPointPageRoutingModule {}

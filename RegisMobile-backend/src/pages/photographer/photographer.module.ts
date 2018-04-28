import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Photographer } from './photographer';

@NgModule({
  declarations: [
    Photographer,
  ],
  imports: [
    IonicPageModule.forChild(Photographer),
  ],
})
export class PhotographerModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientOrder } from './client-order';

@NgModule({
  declarations: [
    ClientOrder,
  ],
  imports: [
    IonicPageModule.forChild(ClientOrder),
  ],
})
export class ClientOrderModule {}

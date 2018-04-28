import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAlbum } from './edit-album';

@NgModule({
  declarations: [
    EditAlbum,
  ],
  imports: [
    IonicPageModule.forChild(EditAlbum),
  ],
})
export class EditAlbumModule {}

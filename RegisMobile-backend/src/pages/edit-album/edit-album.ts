import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase';

/**
 * Generated class for the EditAlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-album',
  templateUrl: 'edit-album.html',
})
export class EditAlbum {

  customers: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,) {
  }
  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.customers = this.firebaseProvider.getCustomers();
  }
  onComplete(){
    this.navCtrl.pop();
  }
}

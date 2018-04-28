import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, Alert, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { EditAlbum } from '../edit-album/edit-album';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CustomerProvider } from './../../providers/customer';
import { PhotoProvider } from './../../providers/photos';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { OrderProvider } from '../../providers/order';
import { Customer } from '../../models/customer';

@Component({
  selector: 'page-photographer',
  templateUrl: 'photographer.html',
})
export class Photographer {

  @ViewChild('navCtrl') nav: NavController;

  customers: FirebaseListObservable<any[]>;
  fName = '';
  lName = '';
  phone = '';
  photo = '';
  photos: any;
  rootPage: any = HomePage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public _PB: PhotoProvider,
    public authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public orderProvider: OrderProvider) {
    this.customers = this.firebaseProvider.getCustomers();
    this.photos = this._PB.selectImage();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  //Navigation Controls
  onSubmitAlbum() {
    this.navCtrl.push(HomePage);
  }
  onEditAlbum() {
    this.navCtrl.push(EditAlbum);
  }

  onAddCustomer(form: NgForm) {
    this.firebaseProvider.addCustomer(form.value.image, form.value.fName, form.value.lName, form.value.phone);
    form.reset();
    this.loadItems();
  }

  private loadItems() {
    loading.present();
          this.authProvider.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.firebaseProvider.getCustomers(token)
                  .subscribe(
                    (list: Customer[]) => {
                      loading.dismiss();
                      if (list) {
                        this.listItems = list;
                      } else {
                        this.listItems = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
    this.customers = this.firebaseProvider.getCustomers();
  }

  removeCustomer(id) {
    this.firebaseProvider.removeCustomer(id);
  }
  selectImage() {
    this._PB.selectImage()
      .then((data) => {
        this.photo = data;
      });
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing in...'
    });
    loading.present();
    this.authProvider.signin(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signin failed...',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
    });
  }

  onLogout(){
    this.authProvider.logout();
    this.navCtrl.setRoot(HomePage);
  }
}

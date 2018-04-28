import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { OrderProvider } from './../../providers/order';
import { PhotoProvider } from '../../providers/photos';
import { NgForm } from '@angular/forms';
import { Order } from '../../models/order';

@IonicPage()
@Component({
  selector: 'page-client-order',
  templateUrl: 'client-order.html',
})
export class ClientOrder {

  order: FirebaseListObservable<any[]>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public orderProvider: OrderProvider) {  }

  onaddOrder(form: NgForm) {
   this.orderProvider.addOrder(form.value.quantity, form.value.product, form.value.photoSel);
   form.reset();
   this.loadItems();
  }

  private loadItems() {
    this.order = this.orderProvider.getOrder();
  }

  onCompleteOrder() {
    this.navCtrl.push(HomePage);
  }
}

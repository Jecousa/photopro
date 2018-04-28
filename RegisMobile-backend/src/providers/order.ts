import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database"; 
import * as firebase from 'firebase';
import { AuthProvider } from './auth';
import { Order } from '../models/order';

@Injectable()
export class OrderProvider {
  private orders: Order[] = [];

  constructor(public http: HttpClient,
    public afd: AngularFireDatabase,
    private authService: AuthProvider) { }

  getOrder() {
    return this.afd.list('/order/');
  }
 
  addOrder(photoSel: string, product: string, quantity: number) {
    this.afd.list('/order/').push(new Order(photoSel, product, quantity));
    console.log(this.orders);
  }
 
  removeOrder(id) {
    this.afd.list('/order/').remove(id);
  }

  createOrder(token: string) {
    const userId= this.authService.getActiveUser().uid;
    return this.http.put('https://photopro-f4041.firebaseio.com/' + userId + '/order.json?auth=' + token, this.orders)
    .map((response: Response) => response.json());
  }

}


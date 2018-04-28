import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database"; 
import * as firebase from 'firebase';
import { Customer } from '../models/customer';
import { AuthProvider } from './auth';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class CustomerProvider {
 private customers: Customer[] = [];

  constructor(public afd: AngularFireDatabase,
  private authService: AuthProvider,
  public http: HttpClient) { }
 
  //addItem Equiv.
  addCustomer(photo: string, fName: string, lName: string, phone: number) {
    this.customers.push(new Customer(photo, fName, lName, phone));
    console.log(this.customers);
  }

  //Display list of customers (fetchList Equiv.)
  getCustomers(token: string) {
    const userId= this.authService.getActiveUser().uid;
    return this.http.get('https://photopro-f4041.firebaseio.com/' + userId + '/customer.json?auth=' + token)
    .map((response: Response) => {
      response.json();
    })
    .do((customers: Customer[]) => {
      if (customers) {
        this.customers = customers
      } else {
        this.customers = [];
      }
    });
  }
 
   //Save Customer (storeList Equiv.)
   createCustomer(token: string) {
    const userId= this.authService.getActiveUser().uid;
    return this.http.put('https://photopro-f4041.firebaseio.com/' + userId + '/customer.json?auth=' + token, this.customers)
    .map((response: Response) => response.json());
  } 

 //Delete Customer
  removeCustomer(id) {
    this.afd.list('/customer/').remove(id);
  }

}
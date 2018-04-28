import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Client} from '../client/client';
import { Photographer} from '../photographer/photographer';
import { SignupPage} from '../signup/signup';
import { NgForm } from "@angular/forms";
import { AuthProvider } from "../../providers/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
  private authProvider: AuthProvider) {

  }

  onGoToClient(){
    this.navCtrl.push(Client);
  }
  onGoToPhotographer(){
    this.navCtrl.push(Photographer);
  }
  onGoToSignup(){
    this.navCtrl.push(SignupPage);
  }
  onSignin(form: NgForm){
    this.authProvider.signin(form.value.email, form.value.password)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }
}

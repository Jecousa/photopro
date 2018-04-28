import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthProvider } from '../../providers/auth'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  onSignup(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: "Creating Account..."
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error =>{
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: "Signup Failed!",
        message: error.message,
        buttons: ['Try Again']
      });
      alert.present();
    });
  }

}

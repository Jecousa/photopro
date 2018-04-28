import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  firebase from 'firebase';
import { firebaseConfig } from './app.module';

import { HomePage } from '../pages/home/home';
import { Photographer } from '../pages/photographer/photographer';
import { AuthProvider } from '../providers/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  isAuthenticated = false;
  Photographer = Photographer;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private authProvider: AuthProvider) {
    platform.ready().then(() => {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.isAuthenticated = true;
          this.rootPage = Photographer;
        } else {
          this.isAuthenticated = false;
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLogout(){
    this.authProvider.logout();
    this.nav.setRoot(HomePage);
  }
}


import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Page1 } from '../page1/page1';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  private menu: MenuController = null;
  private user: any = {'email': '', 'password': ''};

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.menu = menuCtrl;
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  /*
  * Do the login using the user email and password.
  */
  doLogin () {

    //JSON.stringify(user)
    // Call the auth service and do all stuff
    console.log('login -> email = ' + this.user.email + ' password = ' + this.user.password);

    // if auth is ok, then go to another page-login
    this.navCtrl.setRoot(Page1);
  }

}

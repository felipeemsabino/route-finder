import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Page1 } from '../page1/page1';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  registerCredentials = {email: 'user@gmail.com', password: 'user'};
  private menu: MenuController = null;

  constructor(public navCtrl: NavController, private auth: AuthService, public menuCtrl: MenuController) {
    this.menu = menuCtrl;
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  public login () {
    //this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(
      allowed => {
        if (allowed) {
          setTimeout(() => {
          console.log("Success");
          //this.loading.dismiss();
          //this.nav.setRoot(HomePage)
          this.navCtrl.setRoot(Page1);

          });
        } else {
          console.log("Access Denied");
        }
      },
      error => {
        console.log("ERROR: " +error);
      }
    );
  }

  showLoading() {

  }

  showError(text) {

  }
}

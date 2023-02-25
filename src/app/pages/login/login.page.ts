import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  singup() {
    this.router.navigate(['registro']);
  }

  onForgot() {
    this.router.navigate(['forgot-password'])
  }

  login() {
    // this.router.navigate(['']);
    this.navCtrl.navigateRoot(['tabs']);
  }

  onfacebook() {

  }

  onGoogle() {

  }

}

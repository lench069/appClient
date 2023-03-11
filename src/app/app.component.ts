import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['tabs/tab1']);
  }
  nearby() {
    this.router.navigate(['tabs/tab2']);
  }
  cart() {
    this.router.navigate(['tabs/tab3']);
  }
  perfil() {
    this.router.navigate(['tabs/tab4']);
  }
  logout() {
    this.router.navigate(['bienvenida']);
  }
}

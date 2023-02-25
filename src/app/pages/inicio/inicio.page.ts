import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private router: Router,
    public util : UtilsService
  
  ) { }

  slideOpts = {
    slidesPerView: 1.1,
  };

  slideOptstwo = {
    slidesPerView: 2.1,
  };

  ngOnInit() {
  }

  onProducts() {
    this.router.navigate(['products']);
  }

  onFavorite() {
    this.router.navigate(['favorites']);
  }

  onClick() {

  }

  onExplore() {

  }

}

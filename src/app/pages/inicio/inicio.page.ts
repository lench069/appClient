import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { Device } from '@capacitor/device';
import { LoadingController } from '@ionic/angular';
import { ApisService } from 'src/app/services/apis.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  private uuid: string = '';

  constructor(
    private router: Router,
    public util : UtilsService,
    public loading: LoadingController,
    private servicio:ApisService,
    private storage: Storage
  
  ) { }

  slideOpts = {
    slidesPerView: 1.1,
  };

  slideOptstwo = {
    slidesPerView: 2.1,
  };

  async ngOnInit() {
   
     

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

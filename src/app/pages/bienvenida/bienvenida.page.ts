import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { Storage } from '@ionic/storage-angular';
import { ApisService } from 'src/app/services/apis.service';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  @ViewChild('slides', { static: true }) slides: IonSlides; 

  index = 0;
  isLastSlide: boolean = false;

  slideLength: any = 1;
  slidesNumber: any = [];
  private uuid: string = '';

  constructor(
    private router: Router,
    private storage: Storage,
    public loading: LoadingController,
    private servicio:ApisService,
    private navCtrl: NavController
  ) {
    this.storage.create();
    
    //Obtener device
     Device.getId().then((resp: any) => {
      console.log("este es su uuid: " + resp.uuid);
      this.storage.set('uuid', resp.uuid);
     }).catch((error: any) => console.log("Error al obtener el uuid: "+error));
   
    setTimeout(() => {
      this.slides.length().then((data: any) => {
        console.log(data);
        this.slideLength = data;
        this.slidesNumber = [];
        for (let i = 0; i < this.slideLength; i++) {
          this.slidesNumber.push(i);
        }
        console.log(this.slidesNumber);
      });
    }, 1000);

    Device.getId().then((resp: any) => {
      console.log("este es su uuid: " + resp.uuid);
      this.uuid = resp.uuid;

    }).catch((error: any) => console.log("Error al obtener el uuid: "+error));


  }

  async ngOnInit() {


  }

  slideChanged() {
    this.slides.getActiveIndex().then((data: any) => {
      console.log(data);
      this.index = data;
    });

    this.slides.isEnd().then(data => {
      console.log('is end', data);
      this.isLastSlide = data;
    })
  }

  onNext() {
    this.slides.slideNext();
  }

  async onSkip() {
    let l = await this.loading.create();   
    l.present();
    //this.servicio.Cliente_Consulta('a1feb3749ecf12fe')
    this.servicio.Cliente_Consulta(this.uuid)
      .subscribe((data: any) => {
        l.dismiss();
        console.log(data);
        if (data.mensaje == "Cliente encontrado.") {     
          console.log('Validacion'); 
          this.storage.set('cliente', {
            correo: data.info.item.correo,
            direccion: data.info.item.direccion,
            identificacion: data.info.item.cedula,
            nombre: data.info.item.nombre,
            telefono: data.info.item.telefono,
            id: data.info.item.id});
          this.servicio.irA('/tabs');
        } else{
          this.servicio.irA('/registro');
        }
      }, _ => {
        l.dismiss();
        this.servicio.Mensaje('No se pudo realizar la petición.', 'danger');
        this.servicio.irA('/registro');
      });

  }

  onBack() {
    this.slides.slidePrev();
  }

}

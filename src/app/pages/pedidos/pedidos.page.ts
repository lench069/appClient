import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApisService } from 'src/app/services/apis.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  public pedidos: any[] = [];
  public cliente: any = null;

  constructor(
    public util: UtilsService,
    private router: Router,
    public servicio: ApisService,
    public loading: LoadingController,
    public alert: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  onFav() {
    this.router.navigate(['favorites']);
  }
  openRest() {
    this.router.navigate(['products']);
  }

  ionViewWillEnter() {
    this.Cargar_Pedidos();
  }

  async Cargar_Pedidos() {
    this.cliente = await this.storage.get('cliente');
    let l = await this.loading.create();
    l.present();
    this.servicio.Pedido_Listado_cliente(this.cliente.id)
      .subscribe((data: any) => {
        this.pedidos = data.info.items;
        console.log(this.pedidos);
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
      });
  }

}

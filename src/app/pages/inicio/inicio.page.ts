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
  public cliente:any = '';
  public categorias: any[] = [];
  public total: number = 0;
  public productos: any[] = [];
  public totalP: number = 0;
  public texto: string = '';

  constructor(
    private router: Router,
    public util : UtilsService,
    public loading: LoadingController,
    public servicio:ApisService,
    private storage: Storage
  
  ) { 
    this.storage.create();
  }

  slideOpts = {
    slidesPerView: 1.1,
  };

  slideOptstwo = {
    slidesPerView: 2.1,
  };

  async ngOnInit() {
   
     

  }

  async ionViewWillEnter() {
  this.cliente = await this.storage.get('cliente');
   console.log(this.cliente);
    this.Cargar_Categorias();
    this.Cargar_Productos();
    let pedido = await this.storage.get('pedidos');
    //this.pedidolocal = pedido != null ? pedido : [];
  }

  async Cargar_Categorias() {
    let l = await this.loading.create();
    l.present();
    this.servicio.Categoria_Listado(this.texto)
      .subscribe((data: any) => {
        this.categorias = data.info.items;
        console.log(this.categorias);
        this.total = data.info.total;
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
      });
  }

  async Cargar_Productos() {
    let l = await this.loading.create();
    l.present();
    this.servicio.Producto_Listado()
      .subscribe((data: any) => {
        this.productos = data.info.items;
        this.productos.forEach(producto => {
          producto.cantidad = 0;
        });
        this.totalP = data.info.total;
        console.log(this.productos);
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
      });
  }

  async selectCategoria(categoria:any){
    console.log(categoria)
    let l = await this.loading.create();
    l.present();
    this.servicio.Buscar_Productos_Categoria(categoria.id)
      .subscribe((data: any) => {
        this.productos = data.info.items;
        this.productos.forEach(producto => {
          producto.cantidad = 0;
        });
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
      });
  }

}

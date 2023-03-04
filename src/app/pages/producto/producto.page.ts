import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  public productoId: number = 0;
  public producto: any = {};

  constructor(
    private router: Router,
    private NavCtrl: NavController,
    public route:ActivatedRoute,
    public servicio:ApisService,
    public loading: LoadingController
  ) { 

    this.productoId = this.route.snapshot.params['productoId'];
      console.log('id de producto: '+this.productoId);

  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
   
    this.selectProducto(this.productoId);
  }

  onBack() {
    this.NavCtrl.back();
  }

  onCart() {
    this.router.navigate(['cart']);
  }

  onRemove(producto:any) {
    if(producto.cantidad > 0){
      producto.cantidad--;
      //this.productos[i]= producto;
    }
  }

  onAdd(producto:any)  {
    console.log("Agregar producto");
      if(producto.cantidad < 10){   
        producto.cantidad++;
        //this.productos[i] = producto;
  }
}

  onOrder() {
    this.router.navigate(['checkout']);
  }

  async selectProducto(productoId :number){
    let l = await this.loading.create();
    l.present();
    this.servicio.Buscar_Producto(productoId)
      .subscribe((data: any) => {
        this.producto = data.info.item;
        this.producto.cantidad = 0;
        console.log(this.producto);
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
      });
  }

}

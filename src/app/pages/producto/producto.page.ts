import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  public productoId: number = 0;
  public producto: any= {};
  public pedidolocal: any = [];

  constructor(
    private router: Router,
    private NavCtrl: NavController,
    public route:ActivatedRoute,
    public servicio:ApisService,
    public loading: LoadingController,
    private storage: Storage
  ) { 

    this.productoId = this.route.snapshot.params['productoId'];
      console.log('id de producto: '+this.productoId);
      this.storage.create();

  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    let pedido = await this.storage.get('pedidos');
    this.pedidolocal = pedido != null ? pedido : [];
   
    this.selectProducto(this.productoId);
    
  }

  onBack() {
    this.NavCtrl.back();
  }

  onCart() {
    this.router.navigate(['tabs/tab3']);
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

  onOrder(producto:any) {
    let cont = 0;
    if(producto.cantidad != 0){
    for(let i = 0; i < this.pedidolocal.length; i++ ){
          if(this.pedidolocal[i].codigo == producto.codigo){
            this.pedidolocal[i] = producto;
            cont++;
            console.log('aqui');
          console.log(this.pedidolocal);
          }
      }
        if(cont == 0){
          this.pedidolocal.push(producto);
        }
        console.log(this.pedidolocal);
        this.storage.set('pedidos', this.pedidolocal).then((data:any)=>{
          //producto.cantidad = 0;
          //this.selectProducto(productoId :number);
        });
        this.servicio.Mensaje('Producto agregado correctamente', 'success');         
    }else{
      this.servicio.Mensaje('Debe seleccionar una cantidad', 'warning');
    }
  }

  async selectProducto(productoId :number){
    if(this.pedidolocal.length == 0){
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
    }else{
      this.pedidolocal.forEach((item: { id: number; }) => {
        if(item.id ==  this.productoId)
        {
          this.producto = item;
        }
        console.log(this.producto);
      })
      if(Object.entries(this.producto).length === 0){
        this.servicio.Buscar_Producto(productoId)
        .subscribe((data: any) => {
          this.producto = data.info.item;
          this.producto.cantidad = 0;
          console.log(this.producto);
        }, (error: any) => {
        });
      }
      
      ;
    }
    
  }

}

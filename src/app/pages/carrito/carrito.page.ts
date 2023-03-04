import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApisService } from 'src/app/services/apis.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  public pedidos : any;
  public subTotal: number = 0;
  public iva: number = 0;
  public Total: number = 0;
  public flag: boolean = false;
  public id: number = 0;
  public cliente_id: number = 0;
  public usuario_id: number = 0;
  public fecha: any = moment(new Date()).format("YYYY-MM-DD h:mm:ss");
  public estado: number = 0;
  public cliente: any = {};

  constructor(
    public servicio: ApisService,
    public loading: LoadingController,
    public alert: AlertController,
    private storage: Storage,
    public util: UtilsService
  ) { }

  ngOnInit() {
  }

  onClick() {

  }
  checkout() {

  }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    let pedidos = await this.storage.get('pedidos');
    this.cliente = await this.storage.get('cliente');
    if(pedidos != null){
      this.pedidos = pedidos;
    }else{
      this.pedidos = [];
    }
    console.log(this.pedidos);
    console.log(this.cliente);
   
    this.calcularTotal();
  }

  calcularTotal(){
    if(this.pedidos.length > 0){
      this.flag = true;
      console.log(this.pedidos);
      this.subTotal = 0;
      this.pedidos.forEach((element: { precio: string; cantidad: number; }) => {
            this.subTotal = this.subTotal + (parseFloat(element.precio) * element.cantidad);
        });
        this.iva = this.subTotal * 0.12;
        this.Total = this.subTotal + this.iva;
    }
  }

  onRemove(producto:any,i:number) {
    if(producto.cantidad > 0){
      producto.cantidad--;
      this.pedidos[i] = producto;
      this.storage.set('pedidos', this.pedidos);
      this.calcularTotal();
    }
  }

  onAdd(producto:any,i:number)  {
    console.log("Agregar producto");
      if(producto.cantidad < 10){   
        producto.cantidad++;
        this.pedidos[i] = producto;
      this.storage.set('pedidos', this.pedidos);
      this.calcularTotal();
    }
  }

  async pedir()
  {

    const alert = await this.alert.create({
      header: 'Ingrese el numero de mesa',
      buttons: [{
        text: 'No',
        cssClass: 'alert-button-cancel',
        handler: () => {console.log('CANCEL') }
      },
      {
        text: 'Yes',
        cssClass: 'alert-button-confirm',
        handler: async(data)  => {
              console.log(this.subTotal);
              let l = await this.loading.create();
              l.present();
              this.servicio.Pedido_Guardar({
                id: this.id,
                cliente_id: this.cliente.id,
                usuario_id: 1,
                fecha: this.fecha,
                estado: 0,
                subtotal: this.subTotal,
                iva: this.iva,
                total: this.Total,
                mesa: data[0]
              }).subscribe((data: any) => {
                l.dismiss();
                this.pedidos.forEach((element: any) => {
                  this.guardarDetalle(data.info.id, element);
                });
                this.storage.remove('pedidos');
                this.servicio.irA('/tabs/tab1')
                this.flag = false;
                
              }, _ => {
                l.dismiss();
                this.servicio.Mensaje('No se pudo realizar la petición.', 'danger');
              });
        }
      }],
      inputs: [
        {
          id: 'mesa', 
          type: 'number',
          placeholder: '# Mesa',
          min: 1,
          max: 10,
        },       
      ],
    });

    await alert.present();
  }

  guardarDetalle(pedidoId:Number, pedido:any){
    if (pedidoId > 0) {
        //Guarda el detalle del pedido
      this.servicio.Pedido_Guardar_Producto({
        pedido_id: pedidoId ,
        producto_id: pedido.id,
        cantidad: pedido.cantidad,
        precio: pedido.precio
      }).subscribe((data: any) => {
        
      });
    }
}


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApisService } from 'src/app/services/apis.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  private uuid: string = '';
  public cliente:any = '';
  public categorias: any[] = [];
  public total: number = 0;
  public productos: any[] = [];
  public totalP: number = 0;
  public categoriaId: number = 0;
  public texto: string = '';

  constructor(private router: Router,
    public util : UtilsService,
    public loading: LoadingController,
    public servicio:ApisService,
    private NavCtrl: NavController,
    public route:ActivatedRoute) { 

      this.categoriaId = this.route.snapshot.params['cod_categoria'];
      console.log('id de categoria: '+this.categoriaId);
    }

  ngOnInit() {
  }

  onBack() {
    this.servicio.irA('/tabs');
  }

  async ionViewWillEnter() {
   
    this.selectCategoria(this.categoriaId);
  }

  async Cargar_Productos() {

    if(this.texto == ''){
      this.selectCategoria(this.categoriaId);
    }else{
      let l = await this.loading.create();
    l.present();
    this.servicio.Producto_Listado(this.texto)
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
  }

  async selectCategoria(id_categoria:number){
    let l = await this.loading.create();
    l.present();
    this.servicio.Buscar_Productos_Categoria(id_categoria)
      .subscribe((data: any) => {
        this.productos = data.info.items;
        this.productos.forEach(producto => {
          producto.cantidad = 0;
        });
        console.log(this.productos);
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
      });
  }

}

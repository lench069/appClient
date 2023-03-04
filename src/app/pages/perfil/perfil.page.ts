import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApisService } from 'src/app/services/apis.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public id: number = 0;
    public cedula: string = '';
    public nombre: string = '';
    public telefono: string = '';
    public correo: string = '';
    public direccion: string = '';
    public cliente: any;

  constructor(
    private router: Router,
    public util: UtilsService,
    private storage: Storage,
    public servicio: ApisService,
    public loading: LoadingController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    this.cliente = await this.storage.get('cliente');
    console.log(this.cliente);
    this.cedula = this.cliente.identificacion;
    this.nombre = this.cliente.nombre;
    this.telefono = this.cliente.telefono;
    this.correo = this.cliente.correo;
    this.direccion = this.cliente.direccion;
    
  }

  async onEdit() {
    let l = await this.loading.create(); //se crea el loading
    l.present(); //se muestra el loading
    if(this.cedula == '')
    {
      this.servicio.Mensaje('Ingrese su cedula.', 'warning');
      l.dismiss();//quita el loading una vez cargue todo
    }else if(this.nombre == '')
    {
      this.servicio.Mensaje('Ingrese su nombre.', 'warning');
      l.dismiss();//quita el loading una vez cargue todo
    }else if(this.telefono == '')
    {
      this.servicio.Mensaje('Ingrese su telefono.', 'warning');
      l.dismiss();//quita el loading una vez cargue todo
    }else if(this.correo == '')
    {
      this.servicio.Mensaje('Ingrese su correo.', 'warning');
      l.dismiss();//quita el loading una vez cargue todo
    }else if(this.direccion == '')
    {
      this.servicio.Mensaje('Ingrese su direccion.', 'warning');
      l.dismiss();//quita el loading una vez cargue todo
    }else
    {
      this.servicio.Cliente_Actualizar_Cuenta({
        id: this.cliente.id,
        cedula: this.cedula,
        nombre: this.nombre,
        telefono: this.telefono,
        correo: this.correo,
        direccion: this.direccion,
      }).subscribe((data:any)=>{
        this.servicio.Mensaje(data.mensaje,data.info.id == 0 ? 'danger' : 'success');
        this.storage.set('cliente', {
          correo: this.correo,
          direccion: this.direccion,
          identificacion: this.cedula,
          nombre: this.nombre,
          telefono: this.telefono,
          id: this.cliente.id});
        this.servicio.irA('/tabs/tab4');
        l.dismiss();
      },(error:any)=>{
          this.servicio.Mensaje('No se pudo realizar la peticion.','danger');
          l.dismiss();
      });
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  //private URL_API: string = 'http://192.168.100.94/appBackEnd/';
  //private URL_API: string = 'http://riobytes.com/appBackEnd/';
  private URL_API: string = 'http://localhost/appBackEnd/';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alert: AlertController,
    private toast: ToastController
  ) { }

  irA(url: string) {
    this.router.navigateByUrl(url);
  }

  //**************CLIENTE*********************/
  Cliente_Guardar(data: any) {
    console.log(data);
    return this.http.post(this.URL_API + (data.id == 0 ? 'crear-cliente' : 'actualizar-cliente/' + data.id), this.objectToFormData({
      id: data.id,
      identificacion: data.cedula,
      nombre: data.nombre,
      telefono: data.telefono,
      correo: data.correo,
      direccion: data.direccion,
      uuid: data.uuid,
      pass: data.pass,
      activo: data.activo
    }));
  }

  Cliente_Consulta(_id: string) {
    return this.http.get(this.URL_API + 'consultar-cliente/' + _id);
  }

  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }

      }
    }
    return fd;
  };

  //*************PRODUCTOS******** */

  Producto_Listado(_texto: string = '') {
    return this.http.post(this.URL_API + 'listado-productos', this.objectToFormData({
      texto: _texto
    }));
  }

  //***************CATEGORIA ************/
  Categoria_Listado(_texto: string = '') {
    return this.http.post(this.URL_API + 'listado-categorias', this.objectToFormData({
      texto: _texto
    }));
  }

  Buscar_Productos_Categoria(_id: number) {
    return this.http.get(this.URL_API + 'consultar-producto-categoria/' + _id);
  }

  //*****************PRODUCTO********** */
  Buscar_Producto(_id: number) {
    return this.http.get(this.URL_API + 'consultar-producto/' + _id);
  }

  async Mensaje(texto: string, tipo: string = 'success') {
    let t = await this.toast.create({
      message: texto,
      color: tipo,
      duration: 3000
    });
    t.present();
  }

  //***************PEDIDO************ */
  Pedido_Guardar(data: any) {
    console.log(data);
    return this.http.post(this.URL_API + (data.id == 0 ? 'crear-pedido' : 'actualizar-pedido/' + data.id), this.objectToFormData({
      id: data.id,
      cliente_id: data.cliente_id,
      usuario_id: data.usuario_id,
      fecha: data.fecha,
      estado: data.estado == 0 ? '0' : data.estado,
      subtotal: data.subtotal,
      iva: data.iva,
      total: data.total,
      mesa: data.mesa,
    }));
  }

  Pedido_Guardar_Producto(data: any) {
    return this.http.post(this.URL_API + 'pedido/agregar-producto/' + data.pedido_id, this.objectToFormData({
      id: data.id,
      pedido_id: data.pedido_id,
      producto_id: data.producto_id,
      cantidad: data.cantidad,
      precio: data.precio
    }));
  }

  Pedido_Listado_cliente (idcliente: number) {
    return this.http.get(this.URL_API + 'historial/' + idcliente);
  }

  Cliente_Actualizar_Cuenta(data:any) {
    return this.http.post(
      this.URL_API + 'actualizar-cliente/'+data.id, 
      this.objectToFormData({
        nombre: data.nombre,
        cedula: data.cedula,
        telefono: data.telefono,
        correo: data.correo,
        direccion: data.direccion
      }) 
      );
  };


}

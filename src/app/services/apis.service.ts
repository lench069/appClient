import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

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
      pass: data.pass
    }));
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

  async Mensaje(texto: string, tipo: string = 'success') {
    let t = await this.toast.create({
      message: texto,
      color: tipo,
      duration: 3000
    });
    t.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public pedidolocal: any = [];
  constructor(private storage: Storage) { 
    this.storage.create();
  }

  ngOnInit() {
    
  }

  async ionViewWillEnter() {
    let pedido = await this.storage.get('pedidos');
    this.pedidolocal = pedido != null ? pedido : [];
  }

}

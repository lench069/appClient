import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoPageModule } from '../carrito/carrito.module';
import { InicioPageModule } from '../inicio/inicio.module';
import { InicioPage } from '../inicio/inicio.page';
import { PedidosPageModule } from '../pedidos/pedidos.module';
import { PerfilPageModule } from '../perfil/perfil.module';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../inicio/inicio.module').then(m => InicioPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../pedidos/pedidos.module').then(m => PedidosPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../carrito/carrito.module').then(m => CarritoPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../perfil/perfil.module').then(m => PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

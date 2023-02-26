import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoPageModule } from '../pages/carrito/carrito.module';
import { InicioPageModule } from '../pages/inicio/inicio.module';
import { PedidosPageModule } from '../pages/pedidos/pedidos.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../pages/inicio/inicio.module').then(m => InicioPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../pages/pedidos/pedidos.module').then(m => PedidosPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../pages/carrito/carrito.module').then(m => CarritoPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../pages/perfil/perfil.module').then(m => PerfilPageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

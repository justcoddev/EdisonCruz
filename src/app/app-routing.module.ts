import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableProductComponent } from './components/table-product/table-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  // {
  //   path: '**',
  //   redirectTo: '/productos',
  // },
  {
    path: 'productos',
    component: TableProductComponent,
  },
  {
    path: 'nuevo-producto',
    component: AddProductComponent,
  },
  { path: 'editar-producto/:id', component: AddProductComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

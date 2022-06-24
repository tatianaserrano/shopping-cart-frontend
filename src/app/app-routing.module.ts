import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongratsComponent } from './components/congrats/congrats.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'coupons', component: CouponsComponent},
  {path: 'congrats', component: CongratsComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

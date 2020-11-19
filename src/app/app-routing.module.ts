
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';

import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users-add', component: UserAddComponent, canActivate: [AuthGuard] },
  { path: 'users-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'users-edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'companies-list', component: CompaniesListComponent, canActivate: [AuthGuard] },
  { path: 'company-add', component: CompanyAddComponent,canActivate: [AuthGuard] },
  { path: 'company-detail/:id', component: CompanyDetailComponent,canActivate: [AuthGuard] },
  { path: 'company-edit/:id', component: CompanyEditComponent,canActivate: [AuthGuard] },
  { path: 'products', component: ProductComponent },
  { path: 'products-add', component: ProductAddComponent, canActivate: [AuthGuard] },
  { path: 'products-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'products-edit/:id', component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: 'shopping', component: ShoppingComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },

  // { path: 'product-add', component: ProductAddComponent },
  // { path: 'product-detail/:id', component: ProductDetailComponent },
  // { path: 'product-edit/:id', component: ProductEditComponent },}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

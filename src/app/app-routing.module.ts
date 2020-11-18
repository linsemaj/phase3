
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
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'companies-list', component: CompaniesListComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'company-add', component: CompanyAddComponent },
  { path: 'company-detail/:id', component: CompanyDetailComponent },
  { path: 'company-edit/:id', component: CompanyEditComponent },
  { path: 'products', component: ProductComponent },
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

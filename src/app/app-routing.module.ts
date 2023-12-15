import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CompaniesResolverService } from './services/companies-resolver.service';
import { ContactsResolverService } from './services/contacts-resolver.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/companies',
    pathMatch: 'full',
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then(mod => mod.CompaniesModule),
    resolve: [CompaniesResolverService],
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(mod => mod.ContactsModule),
    resolve: [ContactsResolverService],
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' }
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CompaniesComponent } from './companies.component';
import { CompanyComponent } from './company/company.component';
import { CompaniesResolverService } from '../services/companies-resolver.service';
import { ContactsResolverService } from '../services/contacts-resolver.service';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompaniesComponent,
      },
      {
        path: 'new',
        component: CompanyComponent,
        resolve: [ContactsResolverService],
      },
      {
        path: ':id',
        component: CompanyComponent,
        resolve: [CompaniesResolverService, ContactsResolverService],
      },
    ]),
  ]
})
export class CompaniesModule { }

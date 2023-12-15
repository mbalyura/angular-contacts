import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CompaniesComponent } from './companies.component';
import { CompanyComponent } from './company/company.component';
import { FormsModule } from '@angular/forms';
import { CompaniesResolverService } from '../services/companies-resolver.service';
import { ContactsResolverService } from '../services/contacts-resolver.service';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompaniesComponent,
      },
      {
        path: 'new',
        component: CompanyComponent,
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

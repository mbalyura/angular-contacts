import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsComponent } from './contacts.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { CompaniesResolverService } from '../services/companies-resolver.service';
import { ContactsResolverService } from '../services/contacts-resolver.service';



@NgModule({
  declarations: [
    ContactsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactsComponent,
      },
      {
        path: 'new',
        component: ContactComponent,
      },
      {
        path: ':id',
        component: ContactComponent,
        resolve: [CompaniesResolverService, ContactsResolverService],
      },
    ]),
  ]
})
export class ContactsModule { }

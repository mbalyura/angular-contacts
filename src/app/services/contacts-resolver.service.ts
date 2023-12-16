import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { CompaniesService } from './companies.service';
import { Company } from '../models/company.model';
import { Contact } from '../models/contact.model';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsResolverService implements Resolve<Contact[]> {

  constructor(private apiService: ApiService, private contactsService: ContactsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Contact[] | Observable<Contact[]> | Promise<Contact[]> {
    const contacts = this.contactsService.getContacts();

    if (!contacts.length) {
      return this.apiService.fetchContacts();
    } else {
      return contacts;
    }

  }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { ApiService } from './api.service';
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
      return this.apiService.fetchContacts()
        .pipe(tap((contacts) => this.contactsService.updateContacts(contacts)));
    } else {
      return contacts;
    }

  }
}

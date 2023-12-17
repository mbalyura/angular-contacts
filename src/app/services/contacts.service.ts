import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactsChanged = new Subject<Contact[]>();

  private contacts: Contact[] = [];

  getNewId() {
    const lastId = this.contacts.reduce((acc, company) => acc > company.id ? acc : company.id, 0);
    return lastId + 1;
  }

  getContact(id: number) {
    return this.contacts.find(contact => contact.id === id);
  }

  getContacts() {
    return this.contacts;
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }

  updateContacts(contacts: Contact[]) {
    this.contacts = contacts;
  }
}

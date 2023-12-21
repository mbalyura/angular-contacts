import { Injectable } from '@angular/core';

import { Contact } from '../models/contact.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [];

  constructor(private apiService: ApiService) { }

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
    return this.apiService.addContact(contact);
  }

  updateContact(contact: Contact) {
    return this.apiService.updateContact(contact)
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    return this.apiService.deleteContact(id);
  }

  updateContacts(contacts: Contact[]) {
    this.contacts = contacts;
  }
}

import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { Subject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { CompaniesService } from './companies.service';

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
    // this.contactsChanged.next(this.contacts);
  }

  updateContact(index: number, newContact: Contact) {
    this.contacts[index] = newContact;
  }

  updateContacts(contacts: Contact[]) {
    this.contacts = contacts;
    // this.contactsChanged.next(this.contacts);
  }
}

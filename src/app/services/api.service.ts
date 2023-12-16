import { Injectable } from '@angular/core';
import { CompaniesService } from './companies.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

import { Company } from '../models/company.model';
import { ContactsService } from './contacts.service';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  companiesApi = 'http://localhost:3000/companies'; //run json-server to reach!
  contactsApi = 'http://localhost:3000/contacts'; //run json-server to reach!

  constructor(private http: HttpClient, private companiesService: CompaniesService, private contactsService: ContactsService) { }

  fetchCompanies() {
    return this.http
      .get<Company[]>(this.companiesApi)
      .pipe(
        tap((companies) => this.companiesService.updateCompanies(companies))
      );
  }

  fetchContacts() {
    return this.http
      .get<Contact[]>(this.contactsApi)
      .pipe(
        tap((contacts) => this.contactsService.updateContacts(contacts))
      );
  }

  addCompany(company: Company) {
    return this.http
      .post<Company>(`${this.companiesApi}`, company)
      .pipe(
        tap(() => this.companiesService.addCompany(company))
      );
  }

  updateCompany(company: Company) {
    return this.http.put<Company>(`${this.companiesApi}/${company.id}`, company);
  }

  deleteCompany(id: number) {
    return this.http
      .delete<number>(`${this.companiesApi}/${id}`)
      .pipe(
        tap(() => this.companiesService.deleteCompany(id))
      );
  }

  addContact(contact: Contact) {
    return this.http
      .post<Contact>(`${this.contactsApi}`, contact)
      .pipe(
        tap(() => this.contactsService.addContact(contact))
      );
  }

  updateContact(contact: Contact) {
    return this.http.put<Company>(`${this.contactsApi}/${contact.id}`, contact);
  }

  deleteContact(id: number) {
    return this.http
      .delete<number>(`${this.contactsApi}/${id}`)
      .pipe(
        tap(() => this.contactsService.deleteContact(id))
      );
  }
}

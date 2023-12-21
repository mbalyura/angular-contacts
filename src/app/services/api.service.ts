import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, catchError } from 'rxjs';

import { Company } from '../models/company.model';
import { Contact } from '../models/contact.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  companiesApi = 'http://localhost:3000/companies'; //run json-server to reach!
  contactsApi = 'http://localhost:3000/contacts'; //run json-server to reach!

  constructor(
    private http: HttpClient,
    private notificationServis: NotificationService
  ) { }

  handleError() {
    this.notificationServis.error('Connection problem. Try again later.');
    return EMPTY;
  }

  fetchCompanies() {
    return this.http
      .get<Company[]>(this.companiesApi)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  fetchContacts() {
    return this.http
      .get<Contact[]>(this.contactsApi)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  addCompany(company: Company) {
    return this.http
      .post<Company>(`${this.companiesApi}`, company)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  updateCompany(company: Company) {
    return this.http
      .put<Company>(`${this.companiesApi}/${company.id}`, company)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  deleteCompany(id: number) {
    return this.http
      .delete<number>(`${this.companiesApi}/${id}`)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  addContact(contact: Contact) {
    return this.http
      .post<Contact>(`${this.contactsApi}`, contact)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  updateContact(contact: Contact) {
    return this.http
      .put<Company>(`${this.contactsApi}/${contact.id}`, contact)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  deleteContact(id: number) {
    return this.http
      .delete<number>(`${this.contactsApi}/${id}`)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }
}

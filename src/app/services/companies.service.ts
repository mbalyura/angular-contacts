import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Company } from '../models/company.model';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  companiesChanged = new Subject<Company[]>();

  private companies: Company[] = [];

  constructor(private contactsService: ContactsService) { }

  getNewId() {
    const lastId = this.companies.reduce((acc, company) => acc > company.id ? acc : company.id, 0);
    return lastId + 1;
  }

  getCompany(id: number) {
    return this.companies.find(company => company.id === id);
  }

  getCompanyByContact(contactId: number) {
    return this.companies.find(company => company.contacts.includes(contactId));
  }

  getCompanies() {
    return this.companies;
  }

  getCompanyContacts(companyId) {
    const company = this.getCompany(companyId);

    const contacts = company.contacts
      .map(contactId => this.contactsService.getContact(contactId))
      .filter(Boolean);

    return contacts;
  }

  addCompany(company) {
    this.companies.push(company);
  }

  deleteCompany(id) {
    this.companies = this.companies.filter(company => company.id !== id);
    this.companiesChanged.next(this.companies);
  }

  updateCompanies(companies: Company[]) {
    this.companies = companies;
    this.companiesChanged.next(this.companies);
  }
}

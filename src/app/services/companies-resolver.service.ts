import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { ApiService } from './api.service';
import { CompaniesService } from './companies.service';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesResolverService implements Resolve<Company[]> {

  constructor(private apiService: ApiService, private companiesService: CompaniesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Company[] | Observable<Company[]> | Promise<Company[]> {
    const companies = this.companiesService.getCompanies();

    if (!companies.length) {
      return this.apiService.fetchCompanies()
        .pipe(tap((companies) => this.companiesService.updateCompanies(companies)));
    } else {
      return companies;
    }
  }
}

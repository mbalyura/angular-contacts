import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { CompaniesService } from './companies.service';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesResolverService implements Resolve<Company[]> {

  constructor(private apiService: ApiService, private companyService: CompaniesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Company[] | Observable<Company[]> | Promise<Company[]> {
    const companies = this.companyService.getCompanies();

    if (!companies.length) {
      return this.apiService.fetchCompanies()
    } else {
      return companies;
    }
  }
}

import { Component, OnInit } from '@angular/core';

import { CompaniesService } from '../services/companies.service';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companies = this.companiesService.getCompanies();
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Contact } from 'src/app/models/contact.model';
import { ApiService } from 'src/app/services/api.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  company: Company;
  contacts: Contact[];
  companyId: number;
  editMode: boolean = true;

  @ViewChild('companyForm') companyForm: NgForm;

  constructor(
    private companiesService: CompaniesService,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.companyId = +this.route.snapshot.params['id'];
    this.editMode = !!this.route.snapshot.params['id'];

    if (this.editMode) {
      this.company = this.companiesService.getCompany(this.companyId);
      this.contacts = this.companiesService.getCompanyContacts(this.companyId);
    }
    // this.route.params.subscribe((params: Params) => {
    //   this.companyId = +params['id'];
    //   this.editMode = !!params['id'];
    //   this.company = this.companiesService.getCompany(this.companyId);
    //   this.contacts = this.companiesService.getCompanyContacts(this.companyId);
    // })

    this.editMode && setTimeout(this.prefillForm.bind(this), 1);
  }

  prefillForm() {
    this.companyForm.setValue({
      name: this.company.name,
      address: this.company.address,
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.company.name = this.companyForm.form.value.name;
      this.company.address = this.companyForm.form.value.address;
      this.apiService.updateCompany(this.company)
        .subscribe(() => this.notificationService.success('Company updated'));
    } else {
      const {name, address} =  this.companyForm.form.value
      const id = this.companiesService.getNewId();
      const company = new Company(id, name, address, [])
      this.apiService.addCompany(company)
        .subscribe(() => {
          this.notificationService.success('Company added')
          this.router.navigate(['/companies']);
        });
    }
  }

  onDelete() {
    this.apiService.deleteCompany(this.company.id)
      .subscribe(() => {
        this.notificationService.warning('Company deleted');
        this.router.navigate(['/companies']);
      })
  }
}

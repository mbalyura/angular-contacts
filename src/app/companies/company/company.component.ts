import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Contact } from 'src/app/models/contact.model';
import { ApiService } from 'src/app/services/api.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  company: Company;
  contacts: Contact[];
  allContacts: Contact[];
  companyId: number;
  editMode: boolean = true;
  contactsChanged: boolean = false;

  companyForm: FormGroup;

  constructor(
    private companiesService: CompaniesService,
    private contactsService: ContactsService,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.companyId = +this.route.snapshot.params['id'];
    this.editMode = !!this.route.snapshot.params['id'];
    this.allContacts = this.contactsService.getContacts();

    if (this.editMode) {
      this.company = this.companiesService.getCompany(this.companyId);
      if (!this.company) {
        this.router.navigate(['/not-found']);
      }
      this.contacts = this.companiesService.getCompanyContacts(this.companyId);
    }

    this.initForm();
  }

  initForm() {
    let companyName = '';
    let companyAddress = '';
    let companyContacts = [];

    if (this.editMode) {
      const company = this.companiesService.getCompany(this.companyId);
      const contacts = this.companiesService.getCompanyContacts(this.companyId);

      companyName = company.name;
      companyAddress = company.address;
      companyContacts = contacts
        ? contacts.map((contact) => new FormControl(contact.id))
        : companyContacts;
    }

    this.companyForm = new FormGroup({
      name: new FormControl(companyName, Validators.required),
      address: new FormControl(companyAddress, Validators.required),
      contacts: new FormArray(companyContacts),
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.company.name = this.companyForm.value.name;
      this.company.address = this.companyForm.value.address;
      this.company.contacts = this.companyForm.value.contacts;
      this.apiService.updateCompany(this.company)
        .subscribe(() => this.notificationService.success('Company updated'));
    } else {
      const { name, address, contacts } = this.companyForm.value
      const id = this.companiesService.getNewId();
      const company = new Company(id, name, address, contacts)
      this.apiService.addCompany(company)
        .subscribe(() => {
          this.notificationService.success('Company added')
          this.router.navigate(['/companies']);
        });
    }
  }

  getContactsControls() {
    return (<FormArray>this.companyForm.get('contacts')).controls
  }

  onDelete() {
    this.apiService.deleteCompany(this.company.id)
      .subscribe(() => {
        this.notificationService.warning('Company deleted');
        this.router.navigate(['/companies']);
      })
  }

  onDeleteContact(index) {
    (<FormArray>this.companyForm.get('contacts')).removeAt(index);
    this.contactsChanged = true;
  }

  onAddContact() {
    if (!this.allContacts.length) {
      this.notificationService.error('No contacts in contacts list! \n Add them first.');
      return;
    }
    const control = new FormControl(this.allContacts[0].id);
    (<FormArray>this.companyForm.get('contacts')).push(control);
    this.contactsChanged = true;
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from 'src/app/models/contact.model';
import { Company } from 'src/app/models/company.model';
import { Roles } from '../../models/contact.model'
import { ContactsService } from 'src/app/services/contacts.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact: Contact;
  company: Company;
  contactId: number;
  editMode: boolean = true;
  positions = Object.entries(Roles);

  @ViewChild('contactForm') contactForm: NgForm;

  constructor(
    private contactsService: ContactsService,
    private companiesService: CompaniesService,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.contactId = +this.route.snapshot.params['id'];
    this.editMode = !!this.route.snapshot.params['id'];

    if (this.editMode) {
      this.contact = this.contactsService.getContact(this.contactId);
      if (!this.contact) {
        this.router.navigate(['/not-found']);
      } else {
        this.company = this.companiesService.getCompanyByContact(this.contactId);
        setTimeout(this.prefillForm.bind(this), 1);
      }
    }
  }

  prefillForm() {
    this.contactForm.setValue({
      name: this.contact.name,
      lastname: this.contact.lastname,
      phone: this.contact.phone,
      position: this.contact.position,
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.contact.name = this.contactForm.form.value.name;
      this.contact.lastname = this.contactForm.form.value.lastname;
      this.contact.phone = this.contactForm.form.value.phone;
      this.contact.position = this.contactForm.form.value.position;

      this.apiService.updateContact(this.contact)
        .subscribe(() => this.notificationService.success('Contact updated'));
    } else {
      const { name, lastname, phone, position } = this.contactForm.form.value
      const id = this.contactsService.getNewId();
      const contact = new Contact(id, name, lastname, phone, position)

      this.apiService.addContact(contact)
        .subscribe(() => {
          this.notificationService.success('Contact added')
          this.router.navigate(['/contacts']);
        });
    }
  }

  onDelete() {
    this.apiService.deleteContact(this.contact.id)
      .subscribe(() => {
        this.notificationService.warning('Contact deleted');
        this.router.navigate(['/contacts']);

        if (this.company) {
          this.company.contacts = this.company.contacts.filter(contactId => contactId !== this.contact.id);
          this.apiService.updateCompany(this.company)
            .subscribe(() => this.notificationService.success('Company updated'))
        }
      })
  }
}

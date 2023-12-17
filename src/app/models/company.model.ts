import { Contact } from "./contact.model";

export class Company {
  constructor(public id: number, public name: string, public address: string, public contacts: Contact['id'][]) { }
}
export enum Roles {
  cto = 'Cto',
  manager = 'Manager',
  developer = 'Developer',
}

export class Contact {
  constructor(public id: number, public name: string, public lastname: string, public phone: string, public position: Roles) { }
}
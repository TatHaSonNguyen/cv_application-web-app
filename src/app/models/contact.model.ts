import { Moment } from 'moment';

export interface IContact {
  id?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  subject?: string;
  message?: any;
  created?: Moment;
  employeeIdId?: number;
  userAccountLogin?: string;
  userAccountId?: number;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public phoneNumber?: string,
    public subject?: string,
    public message?: any,
    public created?: Moment,
    public employeeIdId?: number,
    public userAccountLogin?: string,
    public userAccountId?: number
  ) {}
}

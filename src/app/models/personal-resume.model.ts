import { Moment } from 'moment';

export interface IPersonalResume {
  id?: number;
  title?: string;
  activeDuration?: string;
  companyName?: string;
  description?: any;
  created?: Moment;
  personalresumegroupTitle?: string;
  personalresumegroupId?: number;
  employeeIdId?: number;
}

export class PersonalResume implements IPersonalResume {
  constructor(
    public id?: number,
    public title?: string,
    public activeDuration?: string,
    public companyName?: string,
    public description?: any,
    public created?: Moment,
    public personalresumegroupTitle?: string,
    public personalresumegroupId?: number,
    public employeeIdId?: number
  ) {}
}

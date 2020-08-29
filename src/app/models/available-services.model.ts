import { Moment } from 'moment';

export interface IAvailableServices {
  id?: number;
  title?: string;
  description?: any;
  serviceIconClassName?: string;
  created?: Moment;
  employeeIdId?: number;
}

export class AvailableServices implements IAvailableServices {
  constructor(
    public id?: number,
    public title?: string,
    public description?: any,
    public serviceIconClassName?: string,
    public created?: Moment,
    public employeeIdId?: number
  ) {}
}

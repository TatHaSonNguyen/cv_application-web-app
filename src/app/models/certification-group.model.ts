import { Moment } from 'moment';

export interface ICertificationGroup {
  id?: number;
  title?: string;
  description?: any;
  created?: Moment;
}

export class CertificationGroup implements ICertificationGroup {
  constructor(public id?: number, public title?: string, public description?: any, public created?: Moment) {}
}

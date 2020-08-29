import { Moment } from 'moment';

export interface IGroupPhoto {
  id?: number;
  title?: string;
  description?: any;
  created?: Moment;
}

export class GroupPhoto implements IGroupPhoto {
  constructor(public id?: number, public title?: string, public description?: any, public created?: Moment) {}
}

import { Moment } from 'moment';

export interface IGroupDocument {
  id?: number;
  title?: string;
  description?: any;
  created?: Moment;
}

export class GroupDocument implements IGroupDocument {
  constructor(public id?: number, public title?: string, public description?: any, public created?: Moment) {}
}

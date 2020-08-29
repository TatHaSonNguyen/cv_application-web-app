import { Moment } from 'moment';

export interface IAvailableSkills {
  id?: number;
  title?: string;
  description?: any;
  percentageLevel?: number;
  created?: Moment;
  employeeIdId?: number;
}

export class AvailableSkills implements IAvailableSkills {
  constructor(
    public id?: number,
    public title?: string,
    public description?: any,
    public percentageLevel?: number,
    public created?: Moment,
    public employeeIdId?: number
  ) {}
}

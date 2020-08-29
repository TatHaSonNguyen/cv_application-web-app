import { Moment } from 'moment';

export interface IPersonalResumeGroup {
  id?: number;
  title?: string;
  description?: any;
  resumeGroupIconClassName?: string;
  created?: Moment;
}

export class PersonalResumeGroup implements IPersonalResumeGroup {
  constructor(
    public id?: number,
    public title?: string,
    public description?: any,
    public resumeGroupIconClassName?: string,
    public created?: Moment
  ) {}
}

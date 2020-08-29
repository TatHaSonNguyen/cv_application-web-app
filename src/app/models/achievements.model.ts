import { Moment } from 'moment';

export interface IAchievements {
  id?: number;
  title?: string;
  statisticInformation?: string;
  created?: Moment;
  employeeIdId?: number;
}

export class Achievements implements IAchievements {
  constructor(
    public id?: number,
    public title?: string,
    public statisticInformation?: string,
    public created?: Moment,
    public employeeIdId?: number
  ) {}
}

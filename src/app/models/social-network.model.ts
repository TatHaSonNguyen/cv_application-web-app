import { Moment } from 'moment';

export interface ISocialNetwork {
  id?: number;
  name?: string;
  socialNetworkLink?: string;
  socialNetworkIconClassName?: string;
  created?: Moment;
  employeeIdId?: number;
}

export class SocialNetwork implements ISocialNetwork {
  constructor(
    public id?: number,
    public name?: string,
    public socialNetworkLink?: string,
    public socialNetworkIconClassName?: string,
    public created?: Moment,
    public employeeIdId?: number
  ) {}
}

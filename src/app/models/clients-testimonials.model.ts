import { Moment } from 'moment';

export interface IClientsTestimonials {
  id?: number;
  name?: string;
  jobPosition?: string;
  recommendation?: any;
  created?: Moment;
  profileImageLinkFileDownloadUri?: string;
  profileImageLinkId?: number;
  employeeIdId?: number;
}

export class ClientsTestimonials implements IClientsTestimonials {
  constructor(
    public id?: number,
    public name?: string,
    public jobPosition?: string,
    public recommendation?: any,
    public created?: Moment,
    public profileImageLinkFileDownloadUri?: string,
    public profileImageLinkId?: number,
    public employeeIdId?: number
  ) {}
}

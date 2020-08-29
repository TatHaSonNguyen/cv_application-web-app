import { Moment } from 'moment';

export interface ICertification {
  id?: number;
  title?: string;
  description?: any;
  created?: Moment;
  certificationgroupTitle?: string;
  certificationgroupId?: number;
  certificationImageLinkFileDownloadUri?: string;
  certificationImageLinkId?: number;
  employeeIdId?: number;
}

export class Certification implements ICertification {
  constructor(
    public id?: number,
    public title?: string,
    public description?: any,
    public created?: Moment,
    public certificationgroupTitle?: string,
    public certificationgroupId?: number,
    public certificationImageLinkFileDownloadUri?: string,
    public certificationImageLinkId?: number,
    public employeeIdId?: number
  ) {}
}

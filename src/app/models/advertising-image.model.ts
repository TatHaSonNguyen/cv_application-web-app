import { Moment } from 'moment';

export interface IAdvertisingImage {
  id?: number;
  advertisingLink?: string;
  created?: Moment;
  advertisingImageLinkFileDownloadUri?: string;
  advertisingImageLinkId?: number;
  employeeIdId?: number;
}

export class AdvertisingImage implements IAdvertisingImage {
  constructor(
    public id?: number,
    public advertisingLink?: string,
    public created?: Moment,
    public advertisingImageLinkFileDownloadUri?: string,
    public advertisingImageLinkId?: number,
    public employeeIdId?: number
  ) {}
}

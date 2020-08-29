import { Moment } from 'moment';

export interface IPhoto {
  id?: number;
  title?: string;
  description?: any;
  imageContentType?: string;
  image?: any;
  fileName?: string;
  fileDownloadUri?: string;
  fileType?: string;
  fileSize?: number;
  uploaded?: Moment;
  groupphotoTitle?: string;
  groupphotoId?: number;
}

export class Photo implements IPhoto {
  constructor(
    public id?: number,
    public title?: string,
    public description?: any,
    public imageContentType?: string,
    public image?: any,
    public fileName?: string,
    public fileDownloadUri?: string,
    public fileType?: string,
    public fileSize?: number,
    public uploaded?: Moment,
    public groupphotoTitle?: string,
    public groupphotoId?: number
  ) {}
}

import { Moment } from 'moment';

export interface IBlog {
  id?: number;
  title?: string;
  topicType?: string;
  postOnlineLink?: any;
  postImageOnlineLink?: any;
  postDate?: Moment;
  postImageLinkFileDownloadUri?: string;
  postImageLinkId?: number;
  employeeIdId?: number;
}

export class Blog implements IBlog {
  constructor(
    public id?: number,
    public title?: string,
    public topicType?: string,
    public postOnlineLink?: any,
    public postImageOnlineLink?: any,
    public postDate?: Moment,
    public postImageLinkFileDownloadUri?: string,
    public postImageLinkId?: number,
    public employeeIdId?: number
  ) {}
}

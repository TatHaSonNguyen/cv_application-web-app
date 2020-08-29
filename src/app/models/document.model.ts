import { Moment } from 'moment';

export interface IDocument {
  id?: number;
  title?: string;
  description?: any;
  dataContentType?: string;
  data?: any;
  fileName?: string;
  fileDownloadUri?: string;
  fileType?: string;
  fileSize?: number;
  uploaded?: Moment;
  groupdocumentTitle?: string;
  groupdocumentId?: number;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public title?: string,
    public description?: any,
    public dataContentType?: string,
    public data?: any,
    public fileName?: string,
    public fileDownloadUri?: string,
    public fileType?: string,
    public fileSize?: number,
    public uploaded?: Moment,
    public groupdocumentTitle?: string,
    public groupdocumentId?: number
  ) {}
}

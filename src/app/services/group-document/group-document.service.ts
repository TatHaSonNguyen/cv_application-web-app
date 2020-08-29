import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IGroupDocument} from '../../models/group-document.model';
import {createRequestOption} from '../../utils/request-util';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IGroupDocument>;
type EntityArrayResponseType = HttpResponse<IGroupDocument[]>;

@Injectable({ providedIn: 'root' })
export class GroupDocumentService {
  public resourceUrl = environment.SERVER_API_URL + 'api/group-documents';

  constructor(protected http: HttpClient) {}

  create(groupDocument: IGroupDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(groupDocument);
    return this.http
      .post<IGroupDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(groupDocument: IGroupDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(groupDocument);
    return this.http
      .put<IGroupDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGroupDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGroupDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(groupDocument: IGroupDocument): IGroupDocument {
    const copy: IGroupDocument = Object.assign({}, groupDocument, {
      created: groupDocument.created && groupDocument.created.isValid() ? groupDocument.created.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created ? moment(res.body.created) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((groupDocument: IGroupDocument) => {
        groupDocument.created = groupDocument.created ? moment(groupDocument.created) : undefined;
      });
    }
    return res;
  }
}

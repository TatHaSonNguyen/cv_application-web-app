import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IGroupPhoto} from '../../models/group-photo.model';
import {createRequestOption} from '../../utils/request-util';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IGroupPhoto>;
type EntityArrayResponseType = HttpResponse<IGroupPhoto[]>;

@Injectable({ providedIn: 'root' })
export class GroupPhotoService {
  public resourceUrl = environment.SERVER_API_URL + 'api/group-photos';

  constructor(protected http: HttpClient) {}

  create(groupPhoto: IGroupPhoto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(groupPhoto);
    return this.http
      .post<IGroupPhoto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(groupPhoto: IGroupPhoto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(groupPhoto);
    return this.http
      .put<IGroupPhoto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGroupPhoto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGroupPhoto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(groupPhoto: IGroupPhoto): IGroupPhoto {
    const copy: IGroupPhoto = Object.assign({}, groupPhoto, {
      created: groupPhoto.created && groupPhoto.created.isValid() ? groupPhoto.created.toJSON() : undefined,
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
      res.body.forEach((groupPhoto: IGroupPhoto) => {
        groupPhoto.created = groupPhoto.created ? moment(groupPhoto.created) : undefined;
      });
    }
    return res;
  }
}

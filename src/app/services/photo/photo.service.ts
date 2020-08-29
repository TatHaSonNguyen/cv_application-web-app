import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IPhoto} from '../../models/photo.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<IPhoto>;
type EntityArrayResponseType = HttpResponse<IPhoto[]>;

@Injectable({ providedIn: 'root' })
export class PhotoService {
  public resourceUrl = environment.SERVER_API_URL + 'api/photos';

  constructor(protected http: HttpClient) {}

  create(photo: IPhoto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(photo);
    return this.http
      .post<IPhoto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(photo: IPhoto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(photo);
    return this.http
      .put<IPhoto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPhoto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPhoto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(photo: IPhoto): IPhoto {
    const copy: IPhoto = Object.assign({}, photo, {
      uploaded: photo.uploaded && photo.uploaded.isValid() ? photo.uploaded.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.uploaded = res.body.uploaded ? moment(res.body.uploaded) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((photo: IPhoto) => {
        photo.uploaded = photo.uploaded ? moment(photo.uploaded) : undefined;
      });
    }
    return res;
  }
}

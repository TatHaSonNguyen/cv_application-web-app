import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {ICertification} from '../../models/certification.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<ICertification>;
type EntityArrayResponseType = HttpResponse<ICertification[]>;

@Injectable({ providedIn: 'root' })
export class CertificationService {
  public resourceUrl = environment.SERVER_API_URL + 'api/certifications';

  constructor(protected http: HttpClient) {}

  create(certification: ICertification): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(certification);
    return this.http
      .post<ICertification>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(certification: ICertification): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(certification);
    return this.http
      .put<ICertification>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICertification>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICertification[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(certification: ICertification): ICertification {
    const copy: ICertification = Object.assign({}, certification, {
      created: certification.created && certification.created.isValid() ? certification.created.toJSON() : undefined,
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
      res.body.forEach((certification: ICertification) => {
        certification.created = certification.created ? moment(certification.created) : undefined;
      });
    }
    return res;
  }
}

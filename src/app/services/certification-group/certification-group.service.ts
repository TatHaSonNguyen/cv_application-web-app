import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {ICertificationGroup} from '../../models/certification-group.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<ICertificationGroup>;
type EntityArrayResponseType = HttpResponse<ICertificationGroup[]>;

@Injectable({ providedIn: 'root' })
export class CertificationGroupService {
  public resourceUrl = environment.SERVER_API_URL + 'api/certification-groups';

  constructor(protected http: HttpClient) {}

  create(certificationGroup: ICertificationGroup): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(certificationGroup);
    return this.http
      .post<ICertificationGroup>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(certificationGroup: ICertificationGroup): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(certificationGroup);
    return this.http
      .put<ICertificationGroup>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICertificationGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICertificationGroup[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(certificationGroup: ICertificationGroup): ICertificationGroup {
    const copy: ICertificationGroup = Object.assign({}, certificationGroup, {
      created: certificationGroup.created && certificationGroup.created.isValid() ? certificationGroup.created.toJSON() : undefined,
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
      res.body.forEach((certificationGroup: ICertificationGroup) => {
        certificationGroup.created = certificationGroup.created ? moment(certificationGroup.created) : undefined;
      });
    }
    return res;
  }
}

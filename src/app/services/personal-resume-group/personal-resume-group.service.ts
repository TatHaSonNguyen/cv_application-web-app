import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IPersonalResumeGroup} from '../../models/personal-resume-group.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<IPersonalResumeGroup>;
type EntityArrayResponseType = HttpResponse<IPersonalResumeGroup[]>;

@Injectable({ providedIn: 'root' })
export class PersonalResumeGroupService {
  public resourceUrl = environment.SERVER_API_URL + 'api/personal-resume-groups';

  constructor(protected http: HttpClient) {}

  create(personalResumeGroup: IPersonalResumeGroup): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personalResumeGroup);
    return this.http
      .post<IPersonalResumeGroup>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(personalResumeGroup: IPersonalResumeGroup): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personalResumeGroup);
    return this.http
      .put<IPersonalResumeGroup>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPersonalResumeGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPersonalResumeGroup[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(personalResumeGroup: IPersonalResumeGroup): IPersonalResumeGroup {
    const copy: IPersonalResumeGroup = Object.assign({}, personalResumeGroup, {
      created: personalResumeGroup.created && personalResumeGroup.created.isValid() ? personalResumeGroup.created.toJSON() : undefined,
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
      res.body.forEach((personalResumeGroup: IPersonalResumeGroup) => {
        personalResumeGroup.created = personalResumeGroup.created ? moment(personalResumeGroup.created) : undefined;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IAvailableSkills} from '../../models/available-skills.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<IAvailableSkills>;
type EntityArrayResponseType = HttpResponse<IAvailableSkills[]>;

@Injectable({ providedIn: 'root' })
export class AvailableSkillsService {
  public resourceUrl = environment.SERVER_API_URL + 'api/available-skills';

  constructor(protected http: HttpClient) {}

  create(availableSkills: IAvailableSkills): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(availableSkills);
    return this.http
      .post<IAvailableSkills>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(availableSkills: IAvailableSkills): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(availableSkills);
    return this.http
      .put<IAvailableSkills>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAvailableSkills>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAvailableSkills[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(availableSkills: IAvailableSkills): IAvailableSkills {
    const copy: IAvailableSkills = Object.assign({}, availableSkills, {
      created: availableSkills.created && availableSkills.created.isValid() ? availableSkills.created.toJSON() : undefined,
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
      res.body.forEach((availableSkills: IAvailableSkills) => {
        availableSkills.created = availableSkills.created ? moment(availableSkills.created) : undefined;
      });
    }
    return res;
  }
}

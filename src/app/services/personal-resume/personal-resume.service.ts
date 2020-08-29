import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IPersonalResume} from '../../models/personal-resume.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<IPersonalResume>;
type EntityArrayResponseType = HttpResponse<IPersonalResume[]>;

@Injectable({ providedIn: 'root' })
export class PersonalResumeService {
  public resourceUrl = environment.SERVER_API_URL + 'api/personal-resumes';

  constructor(protected http: HttpClient) {}

  create(personalResume: IPersonalResume): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personalResume);
    return this.http
      .post<IPersonalResume>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(personalResume: IPersonalResume): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personalResume);
    return this.http
      .put<IPersonalResume>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPersonalResume>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPersonalResume[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(personalResume: IPersonalResume): IPersonalResume {
    const copy: IPersonalResume = Object.assign({}, personalResume, {
      created: personalResume.created && personalResume.created.isValid() ? personalResume.created.toJSON() : undefined,
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
      res.body.forEach((personalResume: IPersonalResume) => {
        personalResume.created = personalResume.created ? moment(personalResume.created) : undefined;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';
import {IAchievements} from '../../models/achievements.model';

type EntityResponseType = HttpResponse<IAchievements>;
type EntityArrayResponseType = HttpResponse<IAchievements[]>;

@Injectable({ providedIn: 'root' })
export class AchievementsService {
  public resourceUrl = environment.SERVER_API_URL + 'api/achievements';

  constructor(protected http: HttpClient) {}

  create(achievements: IAchievements): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(achievements);
    return this.http
      .post<IAchievements>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(achievements: IAchievements): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(achievements);
    return this.http
      .put<IAchievements>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAchievements>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAchievements[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(achievements: IAchievements): IAchievements {
    const copy: IAchievements = Object.assign({}, achievements, {
      created: achievements.created && achievements.created.isValid() ? achievements.created.toJSON() : undefined,
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
      res.body.forEach((achievements: IAchievements) => {
        achievements.created = achievements.created ? moment(achievements.created) : undefined;
      });
    }
    return res;
  }
}

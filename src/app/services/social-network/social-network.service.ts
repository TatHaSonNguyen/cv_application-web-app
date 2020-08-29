import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {ISocialNetwork} from '../../models/social-network.model';
import {createRequestOption} from '../../utils/request-util';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<ISocialNetwork>;
type EntityArrayResponseType = HttpResponse<ISocialNetwork[]>;

@Injectable({ providedIn: 'root' })
export class SocialNetworkService {
  public resourceUrl = environment.SERVER_API_URL + 'api/social-networks';

  constructor(protected http: HttpClient) {}

  create(socialNetwork: ISocialNetwork): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(socialNetwork);
    return this.http
      .post<ISocialNetwork>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(socialNetwork: ISocialNetwork): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(socialNetwork);
    return this.http
      .put<ISocialNetwork>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISocialNetwork>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISocialNetwork[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(socialNetwork: ISocialNetwork): ISocialNetwork {
    const copy: ISocialNetwork = Object.assign({}, socialNetwork, {
      created: socialNetwork.created && socialNetwork.created.isValid() ? socialNetwork.created.toJSON() : undefined,
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
      res.body.forEach((socialNetwork: ISocialNetwork) => {
        socialNetwork.created = socialNetwork.created ? moment(socialNetwork.created) : undefined;
      });
    }
    return res;
  }
}

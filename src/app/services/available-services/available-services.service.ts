import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IAvailableServices} from '../../models/available-services.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<IAvailableServices>;
type EntityArrayResponseType = HttpResponse<IAvailableServices[]>;

@Injectable({ providedIn: 'root' })
export class AvailableServicesService {
  public resourceUrl = environment.SERVER_API_URL + 'api/available-services';

  constructor(protected http: HttpClient) {}

  create(availableServices: IAvailableServices): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(availableServices);
    return this.http
      .post<IAvailableServices>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(availableServices: IAvailableServices): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(availableServices);
    return this.http
      .put<IAvailableServices>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAvailableServices>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAvailableServices[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(availableServices: IAvailableServices): IAvailableServices {
    const copy: IAvailableServices = Object.assign({}, availableServices, {
      created: availableServices.created && availableServices.created.isValid() ? availableServices.created.toJSON() : undefined,
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
      res.body.forEach((availableServices: IAvailableServices) => {
        availableServices.created = availableServices.created ? moment(availableServices.created) : undefined;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IClientsTestimonials} from '../../models/clients-testimonials.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<IClientsTestimonials>;
type EntityArrayResponseType = HttpResponse<IClientsTestimonials[]>;

@Injectable({ providedIn: 'root' })
export class ClientsTestimonialsService {
  public resourceUrl = environment.SERVER_API_URL + 'api/clients-testimonials';

  constructor(protected http: HttpClient) {}

  create(clientsTestimonials: IClientsTestimonials): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(clientsTestimonials);
    return this.http
      .post<IClientsTestimonials>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(clientsTestimonials: IClientsTestimonials): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(clientsTestimonials);
    return this.http
      .put<IClientsTestimonials>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IClientsTestimonials>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClientsTestimonials[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(clientsTestimonials: IClientsTestimonials): IClientsTestimonials {
    const copy: IClientsTestimonials = Object.assign({}, clientsTestimonials, {
      created: clientsTestimonials.created && clientsTestimonials.created.isValid() ? clientsTestimonials.created.toJSON() : undefined,
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
      res.body.forEach((clientsTestimonials: IClientsTestimonials) => {
        clientsTestimonials.created = clientsTestimonials.created ? moment(clientsTestimonials.created) : undefined;
      });
    }
    return res;
  }
}

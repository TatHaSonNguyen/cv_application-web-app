import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IAdvertisingImage} from '../../models/advertising-image.model';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../utils/request-util';

type EntityResponseType = HttpResponse<IAdvertisingImage>;
type EntityArrayResponseType = HttpResponse<IAdvertisingImage[]>;

@Injectable({ providedIn: 'root' })
export class AdvertisingImageService {
  public resourceUrl = environment.SERVER_API_URL + 'api/advertising-images';

  constructor(protected http: HttpClient) {}

  create(advertisingImage: IAdvertisingImage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(advertisingImage);
    return this.http
      .post<IAdvertisingImage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(advertisingImage: IAdvertisingImage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(advertisingImage);
    return this.http
      .put<IAdvertisingImage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAdvertisingImage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAdvertisingImage[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(advertisingImage: IAdvertisingImage): IAdvertisingImage {
    const copy: IAdvertisingImage = Object.assign({}, advertisingImage, {
      created: advertisingImage.created && advertisingImage.created.isValid() ? advertisingImage.created.toJSON() : undefined,
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
      res.body.forEach((advertisingImage: IAdvertisingImage) => {
        advertisingImage.created = advertisingImage.created ? moment(advertisingImage.created) : undefined;
      });
    }
    return res;
  }
}

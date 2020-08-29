import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IBlog} from '../../models/blog.model';
import {createRequestOption} from '../../utils/request-util';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IBlog>;
type EntityArrayResponseType = HttpResponse<IBlog[]>;

@Injectable({ providedIn: 'root' })
export class BlogService {
  public resourceUrl = environment.SERVER_API_URL + 'api/blogs';

  constructor(protected http: HttpClient) {}

  create(blog: IBlog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(blog);
    return this.http
      .post<IBlog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(blog: IBlog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(blog);
    return this.http
      .put<IBlog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBlog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBlog[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(blog: IBlog): IBlog {
    const copy: IBlog = Object.assign({}, blog, {
      postDate: blog.postDate && blog.postDate.isValid() ? blog.postDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.postDate = res.body.postDate ? moment(res.body.postDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((blog: IBlog) => {
        blog.postDate = blog.postDate ? moment(blog.postDate) : undefined;
      });
    }
    return res;
  }
}

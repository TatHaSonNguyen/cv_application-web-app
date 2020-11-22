import { HttpParams } from '@angular/common/http';

export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Search {
  query: string;
}

export interface SearchWithPagination extends Search, Pagination {}

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  const a = '';
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        if (req[key]) {
           if (req[key].logicalOperator) {
            options = options.set(key + '.' + req[key].logicalOperator, req[key].value ? req[key].value : '');
          } else {
             options = options.set(key, req[key].value ? req[key].value : '');
           }
        }
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }

  return options;
};

export enum LogicalOperator {
  equals = 'equals',
  notEquals = 'notEquals',
  greaterThan = 'greaterThan',
  greaterThanOrEqual = 'greaterThanOrEqual',
  lessThan = 'lessThan',
  lessThanOrEqual = 'lessThanOrEqual',
  in = 'in',
  notIn = 'notIn',
  specified = 'specified',
  contains = 'contains',
  doesNotContain = 'doesNotContain'
}

export function mixStringWithKey(txt: string, key: string) {
  try {
    if (txt == null || key == null) { return null; }

    const keys = key.split('');
    const mesg = txt.split('');

    const ml = mesg.length;
    const kl = keys.length;
    const newmsg = new Array(ml);
    for (let i = 0; i < ml; i++) {
      newmsg[i] = String.fromCharCode(mesg[i].charCodeAt(0) ^ keys[i % kl].charCodeAt(0));
    }// for i

    return newmsg.join('');
  } catch (exception) {
    return null;
  }
}

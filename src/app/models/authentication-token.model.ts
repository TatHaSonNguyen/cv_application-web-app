import { Moment } from 'moment';

export interface IAuthenticationToken {
  tokenType?: string;
  expiresIn?: number;
  accessToken?: string;
  scope?: string;
}

export class AuthenticationToken implements IAuthenticationToken {
  constructor(
    public tokenType?: string,
    public  expiresIn?: number,
    public  accessToken?: string,
    public  scope?: string
  ) {}
}

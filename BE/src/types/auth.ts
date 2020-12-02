export interface iTokenGetParams {
  code?: string;
  client_id: string;
  client_secret: string;
  grant_type?: string;
  state?: string;
}

export interface iUser {
  id: string;
  social: string;
  name?: string;
}

export interface iOAuth {
  github?: string;
  naver?: string;
}

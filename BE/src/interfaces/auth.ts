export interface iTokenGetParams {
  code?: string;
  client_id: string;
  client_secret: string;
  grant_type?: string;
  state?: string;
}

export interface User {
  userid: string;
  social: string;
  profile: string;
  name?: string;
  profile: string;
}

export interface iOAuth {
  github?: string;
  naver?: string;
}

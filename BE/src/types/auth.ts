export interface iTokenGetParams {
  code: string;
  client_id: string;
  client_secret: string;
}

export interface iUser {
  id: string;
  name?: string;
}

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

export interface ClientDetailsType {
  client_id: string;
  tenant_id: string;
  role_id: string;
  email: string;
  full_name: string;
  db_name: string;
}

export interface ClientRequestI extends Request {
  client_details?: ClientDetailsType;
}

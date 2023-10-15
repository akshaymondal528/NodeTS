/** ENV types interface */
export interface EnvType {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  REDIS_URI: string;
}

/** Status code types interface */
export interface StatusCodeType {
  OK: number;
  BADREQUEST: number;
  UNAUTH: number;
  NOTFOUND: number;
  SERVERERROR: number;
}

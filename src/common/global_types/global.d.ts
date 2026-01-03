import type { ClientDetailsType } from "@common/global_types/generic_types";

declare global {
  namespace Express {
    interface Request {
      identity_id?: string;
      ip_check?: boolean;
      headers: {
        authorization?: string;
      };
      client_details?: ClientDetailsType;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "stage" | "production";
      PORT: string;

      DB_CONNECTION_LIMIT: number;
      DB_HOST: number;
      DB_PORT: number;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;

      JWT_SECRET_KEY: string;
      STRIPE_SECRET_KEY: string;

      API_DOMAIN: string;
      FRONT_END_DOMAIN: string;
      API_PARAM: string;

      GOOGLE_PROJECT_ID: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URL: string;

      SERVICE_LOG_KEY_NAME: string;
      ENCRYPTION_KEY: string;
    }
  }

  namespace vitest {}
}

interface SessionClientDetail {
  client_id: string;
  tenant_id: string;
  role_id: string;
  email: string;
  full_name: string;
  db_name: string;
}

declare module "express-session" {
  interface SessionData {
    session_client_detail: SessionClientDetail;
  }
}

export type { global };

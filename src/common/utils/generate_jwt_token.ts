import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const secret = process.env.JWT_SECRET_KEY;

interface TokenParamsI {
  tanent_id: number;
  client_id: number;
  role_id: number;
  email_address: string;
}

const generateJWTToken = (tokenParams: TokenParamsI): string => {
  const { tanent_id, client_id, role_id, email_address } = tokenParams;
  const oneMonthInSeconds = 30 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      tanent_id,
      client_id,
      role_id,
      email_address,
    },
    secret,
    {
      expiresIn: oneMonthInSeconds,
    }
  );
  return token;
};

interface TokenParamsGenericI {
  [key: string]: any;
}

export const GenerateGenericJWTToken = (tokenParams: TokenParamsGenericI): string => {
  const oneMonthInSeconds = 30 * 24 * 60 * 60;
  const token = jwt.sign(
    tokenParams, // The entire tokenParams object is now the payload
    secret, // Make sure 'secret' is defined in your scope
    {
      expiresIn: oneMonthInSeconds,
    }
  );
  return token;
};

export default generateJWTToken;

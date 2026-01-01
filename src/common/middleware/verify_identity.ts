import { createHmac } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const signIdentityId = (identityId: string): string => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY environment variable is not defined");
  }
  return createHmac("sha256", SECRET_KEY)
    .update(identityId)
    .digest("base64")
    .replace(/[=+/]/g, "") // Remove special characters if needed
    .substring(0, 16);
};

const verifyIdentityId = (identityId: string, signature: string): boolean => {
  const expectedSignature = signIdentityId(identityId);
  return expectedSignature === signature;
};

const verifyIdentity = (req: Request, res: Response, next: NextFunction) => {
  const { identityId, signature } = req.cookies;

  if (!identityId || !signature || !verifyIdentityId(identityId, signature)) {
    // Generate a new identityId if it's missing or tampered with
    const newIdentityId = uuidv4();
    const newSignature = signIdentityId(newIdentityId);
    // console.log(newSignature,newIdentityId,'console from')

    // Set the cookie with both identityId and its signature
    res.cookie("identityId", newIdentityId, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });
    res.cookie("signature", newSignature, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    req.identity_id = newIdentityId;
    req.ip_check = true;
  } else {
    // Use the existing, valid identityId
    req.identity_id = identityId;
    req.ip_check = false;
  }
  next();
};

export default verifyIdentity;

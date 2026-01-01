import { pbkdf2 } from "node:crypto";

interface PbkdFunctionI {
  success: boolean;
  derivedKey: string;
  message: string;
}

const PBKDFunction = (
  newpassword: string,
  salt: string,
  iterations: number,
  keylen: number,
  digest: string
): Promise<PbkdFunctionI> => {
  return new Promise((resolve, reject) => {
    pbkdf2(newpassword, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) {
        return reject({
          derivedKey: null,
          success: false,
          message: "Error in Operation PBKDF",
        });
      }
      return resolve({
        derivedKey: derivedKey.toString("hex"),
        success: true,
        message: "Successful get derive key",
      });
    });
  });
};

export default PBKDFunction;

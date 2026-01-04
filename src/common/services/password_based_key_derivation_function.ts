import { pbkdf2, randomBytes } from "node:crypto";

interface PbkdFunctionI {
  success: boolean;
  derivedKey: string;
  message: string;
}

const PBKDFunction = (newpassword: string): Promise<PbkdFunctionI> => {
  const salt = randomBytes(16).toString("hex"); // generate a random salt
  const iterations = 10000;
  const keylen = 32;
  const digest = "sha256";

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

import { randomInt } from "node:crypto";
import speakeasy from "speakeasy";

interface Tuple {
    user: string;
    relation: string;
    object: string;
}

const generateOtp = (): string => {
    return randomInt(100000, 999999).toString();
};

const generateTemplateBody = (
    emailBody: string,
    firstname: string,
    otp: string
) => {
    return emailBody
        .replace(/<<firstName>>/g, firstname)
        .replace(/<<totp>>/g, otp)
        .replace(/<<time>>/g, new Date().toUTCString().replace("GMT", "UTC"));
};

const chunkArray = (arr: Tuple[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

const generateSpeakEasyOtp = async (secretKey: string) => {
    try {
        const totp = speakeasy.totp({
            secret: secretKey,
            encoding: "ascii",
            step: 600,
        });
        return totp;
    } catch (error) {
        throw new Error(`generateSpeakEasyOtp Error :: ${error}`);
    }
};

const isValidVerifyOtp = (secret: string, token: string): boolean => {
    const isValid = speakeasy.totp.verify({
        secret,
        token,
        encoding: "ascii",
        step: 600,
        window: 0,
    });
    return isValid;
};

export {
    chunkArray,
    generateOtp,
    generateSpeakEasyOtp,
    generateTemplateBody,
    isValidVerifyOtp,
};

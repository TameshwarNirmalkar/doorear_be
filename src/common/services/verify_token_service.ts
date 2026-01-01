import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

// Define a default type for the decoded JWT payload or explicitly specify it
interface DecodedTokenPayload {
    clientId: string;
    emailaddress: string;
    // Add other properties you expect in your JWT payload
}

interface VerifyTokenI<T> {
    success: boolean;
    message: string;
    data: T | null; // Allow data to be null in case of failure
}

const ValidateEmailToken = async (
    token: string
): Promise<VerifyTokenI<DecodedTokenPayload>> => {
    if (!token) {
        return {
            success: false,
            message: "Token not present.",
            data: null,
        };
    }
    if (!secretKey) {
        return {
            success: false,
            message: "JWT secret key is not configured",
            data: null,
        };
    }

    try {
        // Use a type assertion to tell TypeScript the expected structure of the decoded token
        const decoded = jwt.verify(token, secretKey) as DecodedTokenPayload;
        return {
            success: true,
            message: "Valid token",
            data: decoded,
        };
    } catch (err) {
        // console.error("Token verification failed:", err);
        return {
            success: false,
            message: `Invalid or expired token: ${(err as Error).message}`,
            data: null,
        };
    }
};

export default ValidateEmailToken;

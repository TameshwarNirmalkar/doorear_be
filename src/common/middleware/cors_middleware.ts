import { env } from "@common/utils/envConfig";
import cors from "cors";

const CorsMiddleware = () => {
    return cors({
        origin: env.CORS_ORIGIN,
        credentials: false,
        maxAge: 1000 * 6000,
    });
};

export default () => CorsMiddleware();

import helmet from "helmet";

const HelmetMiddleware = () => {
    return helmet({
        crossOriginResourcePolicy: false,
        referrerPolicy: {
            policy: "no-referrer",
        },
        xXssProtection: false,
        strictTransportSecurity: {
            maxAge: 120,
            preload: true,
        },
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'", "http://locahost:3000"],
            },
        },
    });
};

export default () => HelmetMiddleware();

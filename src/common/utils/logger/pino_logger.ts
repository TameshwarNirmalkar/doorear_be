import { pino } from "pino";

const PinoLogger = pino({
  name: "***** LOGGER *****",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      customColors: "trace:magenta,debug:blue,info:green,warn:yellow,error:red,fatal:red",
      useOnlyCustomProps: true,
    },
  },
});

export default PinoLogger;

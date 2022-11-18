import { parseEnvVars } from "lib/parseEnvVars";
import { readFileSync } from "fs";

export const loadEnvFile = (fileName: string): Record<string, string> =>
  parseEnvVars(
    readFileSync(fileName, {
      encoding: "utf-8",
      flag: "r",
    })
  );

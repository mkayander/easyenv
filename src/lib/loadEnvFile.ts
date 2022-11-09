import { parseEnvVars } from "@src/lib/parseEnvVars";
import { readFile } from "fs/promises";

export const loadEnvFile = async (
  fileName: string
): Promise<Record<string, string>> =>
  parseEnvVars(
    await readFile(fileName, {
      encoding: "utf-8",
      flag: "r",
    })
  );

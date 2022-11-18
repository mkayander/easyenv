import { loadEnvFile } from "lib/loadEnvFile";

export type EnvItem = {
  isValid: boolean;
  isDescribed: boolean;
  value: string;
  example?: string;
};

export type EnvSetup = {
  metaData: Record<string, EnvItem>;
  raw: Record<string, string>;
};

export const getEnvSetup = () => {
  const envSource = loadEnvFile(".env.example");
  const envFile = loadEnvFile(".env");

  const setup: EnvSetup = {
    metaData: {},
    raw: envFile,
  };

  for (const [key, value] of Object.entries(envFile)) {
    let example: string | undefined;

    const isDescribed = key in envSource;
    if (isDescribed) {
      example = envSource[key];
      delete envSource[key];
    }

    const isValid = Boolean(value);
    isDescribed &&
      !isValid &&
      console.warn(`Required environment variable ${key} is not set`);

    setup.metaData[key] = {
      isValid,
      isDescribed,
      value,
      example,
    };
  }

  const unspecified = Object.entries(envSource);
  if (unspecified.length) {
    console.warn("Unspecified required environment variables:");
    unspecified.forEach(([key, value]) => console.warn(`  ${key}=${value}`));
  }

  return setup;
};

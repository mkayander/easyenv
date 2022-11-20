import { EnvSetup, getEnvSetup } from "lib/getEnvSetup";

const createEnvObject = (): NodeJS.Process["env"] => {
  let envSetup: EnvSetup;
  try {
    envSetup = getEnvSetup();
  } catch (error) {
    console.error(
      "Failed to init env setup! Returning normal process.env",
      error
    );
    return process.env;
  }

  return new Proxy(envSetup.raw, {
    get: (target, prop: string) => {
      let value: string | undefined;
      if (prop in process.env || prop in target) {
        value = process.env[prop] || target[prop];
      }

      if (!value) {
        if (prop in envSetup.metaData) {
          throw new Error(`Required environment variable ${prop} is not set`);
        }

        throw new Error(`Environment variable ${prop} not found`);
      }

      return value;
    },
  });
};

export { createEnvObject };

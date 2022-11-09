import { getEnvSetup } from "@src/lib/getEnvSetup";

const getEnvObject = async () => {
  const envSetup = await getEnvSetup();

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

export { getEnvObject };

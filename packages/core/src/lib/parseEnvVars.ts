export const parseEnvVars = (envFile: string): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const match of envFile.matchAll(/^ *(\w+)=(\S*)$/gm)) {
    const [, key, value] = match;

    result[key] = value;
  }

  return result;
};

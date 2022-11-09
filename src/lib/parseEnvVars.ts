export const parseEnvVars = async (
  envFile: string
): Promise<Record<string, string>> => {
  const result: Record<string, string> = {};

  for (const match of envFile.matchAll(/^ *(\w+)=(\w*)$/gm)) {
    const [, key, value] = match;

    result[key] = value;
  }

  return result;
};

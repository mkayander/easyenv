import { execSync } from "child_process";
import rimraf from "rimraf";
import esbuild from "esbuild";

const handleStep = async <T>(
  msg: string,
  step: () => T | Promise<T>,
  doneMsg: string
): Promise<T> => {
  console.log(`🏗 ${msg}`);
  console.time(`✅ ${doneMsg}`);

  const result = await step();

  console.timeEnd(`✅ ${doneMsg}`);

  return result;
};

const indexEntry = "src/index.ts";

const mainOptions: esbuild.BuildOptions = {
  entryPoints: [indexEntry],
  bundle: true,
  // outfile: "dist/index.js",
  platform: "node",
  target: "node14",
};

(async () => {
  rimraf.sync("dist");

  try {
    await handleStep(
      "Building CJS...",
      () =>
        esbuild.build({
          ...mainOptions,
          entryPoints: [indexEntry, "src/bin/easyenv.ts"],
          format: "cjs",
          outdir: "dist/lib",
        }),
      "Built CJS in"
    );

    await handleStep(
      "Building ESM...",
      () =>
        esbuild.build({
          ...mainOptions,
          format: "esm",
          outdir: "dist/esm",
        }),
      "Built ESM in"
    );

    await handleStep(
      "Compiling typings...",
      () => execSync("tsc", { stdio: "inherit" }),
      "Compiled types in"
    );

    console.log("🎉 Build complete! 🎉");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

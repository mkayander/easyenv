import { execSync } from "child_process";
import rimraf from "rimraf";
import esbuild from "esbuild";

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
    await esbuild.build({
      ...mainOptions,
      entryPoints: [indexEntry, "src/bin/easyenv.ts"],
      format: "cjs",
      outdir: "dist/lib",
    });

    await esbuild.build({
      ...mainOptions,
      format: "esm",
      outdir: "dist/esm",
    });

    execSync("tsc", { stdio: "inherit" });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

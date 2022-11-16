import { promises } from "fs";
import spinner from "lib/spinner";

const { readFile, writeFile } = promises;

const initEnv = async () => {
  spinner.start("Initializing environment");

  try {
    const envSource = await readFile(".env.example", {
      encoding: "utf-8",
      flag: "r",
    });

    try {
      const envFile = await readFile(".env", { encoding: "utf-8", flag: "r" });
      console.log("\nExisting env file: \n" + envFile);
      spinner.text = "A .env file already exists. Skipping.";
    } catch (error) {
      await writeFile(".env", envSource, { encoding: "utf-8", flag: "w" });
    }
  } catch (error) {
    console.error(error);
    spinner.fail("Cannot initialize environment - no .env.example file found");
    process.exit(1);
  }

  try {
    spinner.text = "Checking .gitignore for .env";
    const gitIgnore = await readFile(".gitignore", {
      encoding: "utf-8",
      flag: "r",
    });

    if (!gitIgnore.includes(".env")) {
      spinner.text = "Adding .env to .gitignore";
      await writeFile(".gitignore", `${gitIgnore}\n.env\n`, {
        encoding: "utf-8",
        flag: "w",
      });
    }
  } catch (error) {
    await writeFile(".gitignore", ".env\n", { encoding: "utf-8", flag: "w" });
    spinner.color = "green";
    spinner.text = "Created new .gitignore";
  }

  spinner.succeed("Environment initialized");
  process.exit(0);
};

export { initEnv };

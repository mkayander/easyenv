import { Command } from "commander";
import { initEnv } from "@src/cli/init-env";

const program = new Command();

program
  .name("easyenv")
  .description("✨  Easy-out your workflow with environment variables");

program
  .command("init")
  .description("Initialize a new .env file based on your project")
  .action(initEnv);

program.parse();

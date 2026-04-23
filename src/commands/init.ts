import { InitOptions } from "../types";
import { mkdirSync, existsSync, writeFileSync } from "fs";
import { confirm } from "@inquirer/prompts";
import { join } from "path";
import { cwd } from "process";

export const initCommand = async (
  projectName: string,
  options: InitOptions,
) => {
  const dirExists = existsSync(join(cwd(), projectName));
  if (dirExists) {
    const overwriteDir = await confirm({
      message: `Looks like a directory named ${projectName} already exists. Do you want to overwrite it?`,
    });
    if (!overwriteDir) process.exit(0);
  }

  const dirsToCreate = [
    "src/controllers",
    "src/routes",
    "src/models",
    "src/middleware",
    "src/repositories",
  ];

  mkdirSync(join(cwd(), projectName));

  dirsToCreate.forEach((dir) => {
    try {
      mkdirSync(join(cwd(), projectName, dir), { recursive: true });
      console.log(`Directory '${dir}' created successfully!`);
    } catch (error) {
      console.error(`Error creating directory '${dir}:`, error);
    }
  });

  writeFileSync(
    join(cwd(), projectName, ".skafc"),
    JSON.stringify(options, null, 2),
  );
};

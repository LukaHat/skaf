#!/usr/bin/env node

import { program } from "commander";
import { version } from "../package.json";
import { initCommand } from "./commands/init";
import { SupportedDBs, SupportedOrms, SupportedStacks } from "./types";

program
  .name("skaf")
  .version(version)
  .description(
    "Opinionated scaffolding tool for Express and React TypeScript projects",
  );

program
  .command("init <project-name>")
  .option(
    "-s, --stack <stack>",
    "choose the stack for the project",
    SupportedStacks.express,
  )
  .option(
    "--orm <orm>",
    "choose which orm you want to use",
    SupportedOrms.sequelize,
  )
  .option(
    "--db <db>",
    "choose which database you want to use",
    SupportedDBs.postgres,
  )
  .option(
    "-a,  --auth",
    "choose whether to have auth system already implemented",
    true,
  )
  .description("Initialize a new project with the given name")
  .action((projectName, options) => {
    initCommand(projectName, options);
  });

program
  .command("add <resource>")
  .description("Implement scaffolding for given resource")
  .action((resource) => {
    console.log("not implemented yet", resource);
  });

program
  .command("list")
  .description("List all generated resources and their file paths")
  .action(() => {
    console.log("not implemented yet");
  });

program
  .command("config")
  .description("Interactive setup for .skafc configuration file")
  .action(() => {
    console.log("not implemented yet");
  });

program.parse();

if (process.argv.length < 3) program.help();

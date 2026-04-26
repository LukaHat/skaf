import { existsSync, readFileSync } from "fs";
import { loadConfig } from "../config";
import { buildResourceContext, renderTemplate } from "../templateEngine";
import { join } from "path";

export const addCommand = (resource: string, options: { force: boolean }) => {
  try {
    const config = loadConfig();
    const casingVariants = buildResourceContext(resource);

    const modelPath = join(
      config.srcDir,
      "models",
      casingVariants.resourceFile + "Model.ts",
    );
    if (existsSync(modelPath) && !options.force)
      throw new Error(
        `File already exists: ${modelPath}, Use --force to overwrite.`,
      );
    const modelTemplate = readFileSync(
      join(
        __dirname,
        "..",
        "templates",
        "express",
        "resources",
        "model.ts.template",
      ),
      "utf-8",
    );
    renderTemplate(modelTemplate, casingVariants, modelPath);

    const controllerPath = join(
      config.srcDir,
      "controllers",
      casingVariants.resourceFile + "Controller.ts",
    );

    if (existsSync(controllerPath) && !options.force)
      throw new Error(
        `File already exists: ${controllerPath}, Use --force to overwrite.`,
      );

    const controllerTemplate = readFileSync(
      join(
        __dirname,
        "..",
        "templates",
        "express",
        "resources",
        "controller.ts.template",
      ),
      "utf-8",
    );

    renderTemplate(controllerTemplate, casingVariants, controllerPath);

    const repositoryPath = join(
      config.srcDir,
      "repositories",
      casingVariants.resourceFile + "Repository.ts",
    );

    if (existsSync(repositoryPath) && !options.force)
      throw new Error(
        `File already exists: ${repositoryPath}, Use --force to overwrite.`,
      );
    const repositoryTemplate = readFileSync(
      join(
        __dirname,
        "..",
        "templates",
        "express",
        "resources",
        "repository.ts.template",
      ),
      "utf-8",
    );
    renderTemplate(repositoryTemplate, casingVariants, repositoryPath);

    const routerPath = join(
      config.srcDir,
      "routes",
      casingVariants.resourceFile + "Router.ts",
    );

    if (existsSync(routerPath) && !options.force)
      throw new Error(
        `File already exists: ${routerPath}, Use --force to overwrite.`,
      );

    const routerTemplate = readFileSync(
      join(
        __dirname,
        "..",
        "templates",
        "express",
        "resources",
        "routes.ts.template",
      ),
      "utf-8",
    );

    renderTemplate(routerTemplate, casingVariants, routerPath);
  } catch (error) {
    throw new Error(`Failed to generate resource: ${(error as Error).message}`);
  }
};

#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "fs/promises";
import inquirer from "inquirer";
import chalk from "chalk";

const pkgJson = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);

const log = console.log;

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "Please input project name:",
    validate: (value, obj) => {
      if (value) {
        return true;
      } else {
        log(chalk.red("\n Error: Project name is required."));
        return false;
      }
    },
  },
  {
    type: "input",
    name: "projecDesc",
    message: "Please input project description:",
    default: undefined,
  },
  {
    type: "list",
    name: "templateType",
    message: "Please choose project template:",
    choices: [
      {
        name: "H5: React + TypeScript + Redux",
        value: "H5_RTR",
        short: "H5: React + TypeScript + Redux",
      },
      {
        name: "PC: React + TypeScript + Redux",
        value: "PC_RTR",
        short: "PC: React + TypeScript + Redux",
      },
      {
        name: "Ant Design Project",
        value: "antd",
        short: "Antd",
      },
    ],
  },
];

function init() {
  const program = new Command();
  const prompt = inquirer.createPromptModule();

  program.version(pkgJson.version, "-v, --version");

  program
    .command("init")
    // .argument("<project-name>")
    .action((args) => {
      // console.log(args);
      prompt(questions).then((ans) => console.log(ans));
    });

  program.parse();
}

init();

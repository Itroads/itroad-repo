#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "fs/promises";
import inquirer from "inquirer";
import chalk from "chalk";
import { exec } from "child_process";
// import { logSpec } from "@itroad/utils";
// const logSpec = require("@itroad/utils");
import pkg from "@itroad/utils";
const { logSpec } = pkg;

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
        name: "H5: React+TypeScript+Redux+Sass",
        value: {
          gitUrl: "",
          gitName: "",
        },
        short: "H5: React+TypeScript+Redux+Sass",
      },
      {
        name: "PC: React+TypeScript+Redux+Sass",
        value: {
          gitUrl: "",
          gitName: "",
        },
        short: "PC: React+TypeScript+Redux+Sass",
      },
      {
        name: "Next.js Custom Server",
        value: {
          gitUrl: "",
          gitName: "",
        },
        short: "Next.js Custom Server",
      },
      {
        name: "Ant Design Project",
        value: {
          gitUrl: "",
          gitName: "",
        },
        short: "Antd",
      },
    ],
  },
];

function init() {
  const program = new Command();
  const prompt = inquirer.createPromptModule();

  logSpec();

  program.version(pkgJson.version, "-v, --version");

  program
    .command("init")
    // .argument("<project-name>")
    .action((args) => {
      // console.log(args);
      prompt(questions).then((ans) => {
        console.log(ans);
        const { gitUrl, gitName } = ans.templateType;
        const url = "https://github.com/Itroads/react-admin-ts-starter.git";
        if (!gitUrl) {
          log(chalk.bgBlueBright("This template is being prepared"));
          return;
        }
        exec("git clone " + url, (err, stdout, stderr) => {
          if (err !== null) {
            log(chalk.red(`clone fail: ${err}`));
            return;
          }
          // fs.rename(gitName, projectName, (err) => {
          //   if (err) {
          //     exec("rm -rf " + gitName, function (err, out) {});
          //     console.log(
          //       chalk.red(`The ${projectName} project template already exist`)
          //     );
          //   } else {
          //     console.log(
          //       chalk.green(
          //         `✔ The ${projectName} project template successfully create(项目模版创建成功)`
          //       )
          //     );
          //   }
          // });
          process.exit(1);
        });
      });
    });

  program.parse();
}

init();

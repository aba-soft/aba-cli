import { Command } from "@oclif/command";
import { cli } from "cli-ux";
import { execSync } from "child_process";
import {packageInfo } from '../packageManager';
export default class Remove extends Command {
  static description = "remove package from your nca project";
  static strict = false;
  static args = [
    {
      name: "packageName",
      required: true,
      description:
        "name of npm module you want to remove from your nca project",
    },
  ];

  async run() {
    const { argv } = this.parse(Remove);
    const packages = argv.join(" ");
    const command = `yarn remove ${packages}`;
    // TODO: remove types as well
    cli.action.start(`removing packages: ${packages}`);
    try {
      const executed = execSync(command);
      await packageInfo({argv, dev: false, layer: "global", mode: "remove"}); 
    } catch (error) {
      cli.action.stop("remove failed");
      this.error(error);
    }
    cli.action.stop("done");
  }
}

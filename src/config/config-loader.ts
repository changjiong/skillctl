import fs from "fs-extra";
import YAML from "yaml";
import { sourcesYaml } from "./paths.js";
import { SourcesConfig } from "./types.js";

export async function readSources(): Promise<SourcesConfig> {
  if (!(await fs.pathExists(sourcesYaml))) return { sources: {} };
  return YAML.parse(await fs.readFile(sourcesYaml, "utf8")) as SourcesConfig;
}
export async function writeSources(cfg: SourcesConfig) { await fs.writeFile(sourcesYaml, YAML.stringify(cfg), "utf8"); }

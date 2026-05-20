import os from "node:os";
import path from "node:path";
export const skillctlHome = path.join(os.homedir(), ".skillctl");
export const configYaml = path.join(skillctlHome, "config.yaml");
export const sourcesYaml = path.join(skillctlHome, "sources.yaml");
export const agentsYaml = path.join(skillctlHome, "agents.yaml");
export const lockfilePath = path.join(skillctlHome, "skillctl.lock");

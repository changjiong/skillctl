import fs from "fs-extra";
import YAML from "yaml";
import { lockfilePath } from "../config/paths.js";
import { LockfileData } from "../config/types.js";
export async function readLockfile(): Promise<LockfileData>{ if(!(await fs.pathExists(lockfilePath))) return {version:1,installed:[]}; return YAML.parse(await fs.readFile(lockfilePath,"utf8")) as LockfileData; }
export async function writeLockfile(data: LockfileData){ await fs.writeFile(lockfilePath, YAML.stringify(data), "utf8"); }

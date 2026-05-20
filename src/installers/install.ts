import path from "node:path";
import fs from "fs-extra";
import { getAgentDir } from "../agents/agent-registry.js";
import { normalizeSkillPackage } from "../packages/normalize.js";
import { validateSkillPackage } from "../packages/validate.js";
import { checksumFile } from "../packages/checksum.js";
import { readLockfile, writeLockfile } from "../lock/lockfile.js";
export async function installSkill(skillDir: string, agent: string, mode: "managed-copy"|"symlink"="managed-copy"){
 const pkg=await normalizeSkillPackage(skillDir); validateSkillPackage(pkg); const target=path.join(getAgentDir(agent),pkg.manifest.name); await fs.ensureDir(path.dirname(target)); await fs.remove(target); if(mode==="symlink") await fs.symlink(pkg.rootDir,target,"dir"); else await fs.copy(pkg.rootDir,target); const lock=await readLockfile(); lock.installed.push({name:pkg.manifest.name,version:pkg.manifest.version,source:"local",source_uri:skillDir,checksum:await checksumFile(pkg.skillMdPath),installed_at:new Date().toISOString(),installed_to:[{agent,runtime:"current",scope:"personal",path:target,mode}]}); await writeLockfile(lock); return target; }

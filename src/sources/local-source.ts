import fs from "fs-extra";
import path from "node:path";
import { normalizeSkillPackage } from "../packages/normalize.js";
export async function listLocalSkills(baseDir: string): Promise<string[]> {
  const found: string[] = [];
  async function walk(dir: string, depth: number){ if(depth>2)return; const ents=await fs.readdir(dir).catch(()=>[] as string[]); for(const e of ents){const full=path.join(dir,e); if((await fs.stat(full)).isDirectory()){ if(await fs.pathExists(path.join(full,"SKILL.md"))) found.push(full); await walk(full,depth+1);} } }
  await walk(baseDir,0); return found;
}
export async function searchLocalSkills(baseDir: string, q: string){ const dirs=await listLocalSkills(baseDir); const out=[] as any[]; for(const d of dirs){const p=await normalizeSkillPackage(d); if(p.manifest.name.includes(q)||p.manifest.description.includes(q)) out.push(p);} return out; }

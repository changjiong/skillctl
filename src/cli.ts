import { Command } from "commander";
import fs from "fs-extra";
import YAML from "yaml";
import { skillctlHome, configYaml, sourcesYaml, agentsYaml, lockfilePath } from "./config/paths.js";
import { writeSources, readSources } from "./config/config-loader.js";
import { searchLocalSkills } from "./sources/local-source.js";
import { installSkill } from "./installers/install.js";
import { uninstallSkill } from "./installers/uninstall.js";
import { listInstalled } from "./installers/list-installed.js";
import { doctor } from "./doctor/doctor.js";

export function buildCli(){
 const p=new Command(); p.name("skillctl");
 p.command("init").action(async()=>{ await fs.ensureDir(skillctlHome); await fs.ensureDir(`${skillctlHome}/cache/sources`); await fs.ensureDir(`${skillctlHome}/cache/normalized`); await fs.writeFile(configYaml,YAML.stringify({version:1}),"utf8"); await fs.writeFile(sourcesYaml,YAML.stringify({sources:{}}),"utf8"); await fs.writeFile(agentsYaml,YAML.stringify({agents:{}}),"utf8"); await fs.writeFile(lockfilePath,YAML.stringify({version:1,installed:[]}),"utf8"); console.log("initialized",skillctlHome);});
 p.command("source").command("add <name> <type> <value>").action(async(name,type,value)=>{ const s=await readSources(); (s.sources as any)[name]={type,path:value}; await writeSources(s); console.log("added",name); });
 p.command("source").command("list").action(async()=>{ const s=await readSources(); Object.entries(s.sources).forEach(([n,v])=>console.log(n,v.type,v.path||v.repo||v.url||"")); });
 p.command("search <q>").option("--source <source>").action(async(q,opts)=>{ const s=await readSources(); const only=opts.source?[opts.source]:Object.keys(s.sources); for(const k of only){ const cfg=(s.sources as any)[k]; if(cfg?.type==="local"){ const rows=await searchLocalSkills(cfg.path,q); rows.forEach((r:any)=>console.log(`${r.manifest.name}\t${r.manifest.version}\t${k}\t${r.manifest.description}`)); } } });
 p.command("install <skillDir>").requiredOption("--agent <agent>").option("--mode <mode>","managed-copy").action(async(skillDir,opts)=>{console.log(await installSkill(skillDir,opts.agent,opts.mode));});
 p.command("uninstall <name>").requiredOption("--agent <agent>").action(async(name,opts)=>{await uninstallSkill(name,opts.agent);});
 p.command("list").action(async()=>{console.log(await listInstalled());});
 p.command("doctor").action(()=>console.log(doctor()));
 return p;
}

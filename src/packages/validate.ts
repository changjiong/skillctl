import fs from "fs-extra";
import { LocalSkillPackage } from "./skill-package.js";
export function validateSkillPackage(pkg: LocalSkillPackage): string[] {
  const warnings: string[] = [];
  const { name, description } = pkg.manifest;
  if (!name) throw new Error("name is required");
  if (!/^[a-z0-9_-]+$/.test(name)) throw new Error("invalid name");
  if (!description?.trim()) throw new Error("description is required");
  if (description.length > 500) warnings.push("description > 500 chars");
  const st = fs.statSync(pkg.skillMdPath);
  if (st.size > 200 * 1024) throw new Error("SKILL.md too large");
  return warnings;
}

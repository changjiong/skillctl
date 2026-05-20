import path from "node:path";
import fs from "fs-extra";
import matter from "gray-matter";
import { LocalSkillPackage } from "./skill-package.js";

export async function normalizeSkillPackage(rootDir: string): Promise<LocalSkillPackage> {
  const skillMdPath = path.join(rootDir, "SKILL.md");
  if (!(await fs.pathExists(skillMdPath))) throw new Error("SKILL.md not found");
  const parsed = matter(await fs.readFile(skillMdPath, "utf8"));
  return { rootDir, skillMdPath, manifest: { name: String(parsed.data.name ?? ""), description: String(parsed.data.description ?? ""), version: String(parsed.data.version ?? "0.0.0-local") } };
}

import { describe,it,expect } from "vitest";import { normalizeSkillPackage } from "../src/packages/normalize.js";
describe("normalize",()=>{it("reads manifest", async()=>{ const p=await normalizeSkillPackage("tests/fixtures/skills/simple-skill"); expect(p.manifest.name).toBe("simple-skill");});});

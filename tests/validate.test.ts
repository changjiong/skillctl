import { describe,it,expect } from "vitest";import { normalizeSkillPackage } from "../src/packages/normalize.js";import { validateSkillPackage } from "../src/packages/validate.js";
describe("validate",()=>{it("valid skill", async()=>{ const p=await normalizeSkillPackage("tests/fixtures/skills/simple-skill"); expect(validateSkillPackage(p)).toEqual([]);});});

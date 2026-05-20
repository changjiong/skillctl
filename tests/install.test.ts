import { describe,it,expect } from "vitest";import { installSkill } from "../src/installers/install.js";
describe("install",()=>{it("installs", async()=>{ const t=await installSkill("tests/fixtures/skills/simple-skill","codex"); expect(t.includes("simple-skill")).toBe(true);});});

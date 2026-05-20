import { describe,it,expect } from "vitest";import { windowsToWslPath,wslToWindowsPath } from "../src/runtimes/path-map.js";
describe("path map",()=>{it("win->wsl",()=>{expect(windowsToWslPath("D:\\work\\skills")).toBe("/mnt/d/work/skills");});it("wsl->win",()=>{expect(wslToWindowsPath("/mnt/c/Users/Jong")).toBe("C:\\Users\\Jong");});});

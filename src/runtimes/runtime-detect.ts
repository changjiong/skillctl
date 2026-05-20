import os from "node:os";
import fs from "node:fs";
import { RuntimeInfo } from "./runtime-types.js";

export function detectRuntime(): RuntimeInfo {
  const platform = process.platform;
  if (platform === "win32") return { kind: "windows", homeDir: os.homedir(), platform };
  if (platform === "darwin") return { kind: "macos", homeDir: os.homedir(), platform };
  if (platform === "linux") {
    const v = fs.existsSync("/proc/version") ? fs.readFileSync("/proc/version", "utf8") : "";
    if (/microsoft|wsl/i.test(v)) return { kind: "wsl", homeDir: os.homedir(), platform, distro: process.env.WSL_DISTRO_NAME };
    return { kind: "linux", homeDir: os.homedir(), platform };
  }
  return { kind: "linux", homeDir: os.homedir(), platform };
}

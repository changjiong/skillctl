import os from "node:os";
import path from "node:path";
export function getAgentDir(agent: string){ return path.join(os.homedir(), `.${agent}`, "skills"); }

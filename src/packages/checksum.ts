import crypto from "node:crypto";
import fs from "fs-extra";
export async function checksumFile(filePath: string): Promise<string> { const b = await fs.readFile(filePath); return `sha256:${crypto.createHash("sha256").update(b).digest("hex")}`; }

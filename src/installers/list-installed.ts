import { readLockfile } from "../lock/lockfile.js";
export async function listInstalled(){ return (await readLockfile()).installed; }

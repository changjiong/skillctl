export type SourceType = "local" | "github" | "git" | "npx";
export interface SourceEntry { type: SourceType; path?: string; repo?: string; ref?: string; base_path?: string; url?: string; command?: string; args?: string[]; }
export interface SourcesConfig { sources: Record<string, SourceEntry>; }
export interface LockInstallTarget { agent: string; runtime: string; scope: string; path: string; mode: string; }
export interface LockEntry { name: string; version: string; source: string; source_uri: string; checksum: string; installed_at: string; installed_to: LockInstallTarget[]; }
export interface LockfileData { version: number; installed: LockEntry[]; }

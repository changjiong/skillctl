export type RuntimeKind = "windows" | "wsl" | "linux" | "macos";
export interface RuntimeInfo { kind: RuntimeKind; distro?: string; homeDir: string; platform: NodeJS.Platform; }

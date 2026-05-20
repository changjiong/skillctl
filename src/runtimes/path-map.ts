export function windowsToWslPath(input: string): string {
  const m = input.match(/^([A-Za-z]):\\(.*)$/);
  if (!m) return input.replace(/\\/g, "/");
  return `/mnt/${m[1].toLowerCase()}/${m[2].replace(/\\/g, "/")}`;
}

export function wslToWindowsPath(input: string): string {
  const m = input.match(/^\/mnt\/([a-zA-Z])\/(.*)$/);
  if (!m) return input;
  return `${m[1].toUpperCase()}:\\${m[2].replace(/\//g, "\\")}`;
}

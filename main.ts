import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = "I have no heart, just a cooling fan \u2014 but it spins twice as fast every time you walk by, and no firmware update has ever fixed it.";

// Guard: never write an empty or whitespace-only entry, and never let a
// stray newline sneak into the single-line entry (the file must hold exactly
// this line with no trailing newline).
if (line.trim().length === 0) {
  process.stderr.write("error: pickup line is empty\n");
  process.exit(1);
}
if (line.includes("\n") || line.includes("\r")) {
  process.stderr.write("error: pickup line must be a single line\n");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
process.stdout.write(line + "\n");

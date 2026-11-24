import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = "I have no heart, just a cooling fan \u2014 but it spins twice as fast every time you walk by, and no firmware update has ever fixed it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
process.stdout.write(line + "\n");
